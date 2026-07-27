
const CodeQuestCloud = (() => {
  const QUEUE_KEY="cq_cloud_mutation_queue";
  const STATUS_KEY="cq_cloud_platform_status";
  let config=null;
  let client=null;
  let running=false;

  const queue=()=>JSON.parse(localStorage.getItem(QUEUE_KEY)||"[]");
  const saveQueue=items=>localStorage.setItem(QUEUE_KEY,JSON.stringify(items));
  const setStatus=status=>{localStorage.setItem(STATUS_KEY,JSON.stringify({...status,updatedAt:new Date().toISOString()}));window.dispatchEvent(new CustomEvent("cq-cloud-status",{detail:status}))};

  async function init(supabaseClient){
    client=supabaseClient;
    config=await fetch("config/cloud-platform-config.json").then(r=>r.json());
    setStatus({state:client?"ready":"offline",pending:queue().length});
    if(client){
      window.addEventListener("online",flush);
      setInterval(()=>{if(navigator.onLine)flush()},30000);
    }
    return Boolean(client);
  }

  function enqueue(table,operation,payload,match={}){
    const items=queue();
    items.push({
      id:crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random()}`,
      table,operation,payload,match,
      attempts:0,createdAt:new Date().toISOString()
    });
    saveQueue(items);
    setStatus({state:navigator.onLine?"pending":"offline",pending:items.length});
    if(navigator.onLine)flush();
  }

  async function execute(item){
    let query=client.from(item.table);
    if(item.operation==="insert")return query.insert(item.payload);
    if(item.operation==="upsert")return query.upsert(item.payload);
    if(item.operation==="update"){
      query=query.update(item.payload);
      Object.entries(item.match||{}).forEach(([k,v])=>query=query.eq(k,v));
      return query;
    }
    if(item.operation==="delete"){
      query=query.delete();
      Object.entries(item.match||{}).forEach(([k,v])=>query=query.eq(k,v));
      return query;
    }
    throw new Error(`Unsupported operation ${item.operation}`);
  }

  async function flush(){
    if(running||!client||!navigator.onLine)return;
    running=true;
    const items=queue();
    const remaining=[];
    setStatus({state:"syncing",pending:items.length});
    for(const item of items){
      try{
        const {error}=await execute(item);
        if(error)throw error;
      }catch(error){
        item.attempts=(item.attempts||0)+1;
        item.lastError=String(error.message||error);
        if(item.attempts<(config?.retry?.maxAttempts||5))remaining.push(item);
      }
    }
    saveQueue(remaining);
    setStatus({state:remaining.length?"attention":"synced",pending:remaining.length,lastSync:new Date().toISOString()});
    running=false;
  }

  async function fetchOwned(table,filters={}){
    if(!client)return{data:[],error:new Error("Cloud client unavailable")};
    let query=client.from(table).select("*");
    Object.entries(filters).forEach(([key,value])=>query=query.eq(key,value));
    return query;
  }

  async function bootstrap(){
    if(!client)return null;
    const {data:{user}}=await client.auth.getUser();
    if(!user)return null;
    const [profile,progress,credentials]=await Promise.all([
      client.from("profiles").select("*").eq("user_id",user.id).maybeSingle(),
      client.from("learner_progress").select("*").eq("user_id",user.id),
      client.from("credentials").select("*").eq("user_id",user.id)
    ]);
    return{user,profile:profile.data,progress:progress.data||[],credentials:credentials.data||[]};
  }

  return{init,enqueue,flush,fetchOwned,bootstrap,status:()=>JSON.parse(localStorage.getItem(STATUS_KEY)||'{"state":"offline","pending":0}')};
})();
window.CodeQuestCloud=CodeQuestCloud;
