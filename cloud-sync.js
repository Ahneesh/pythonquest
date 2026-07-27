window.PythonQuestCloud=(()=>{
  let client=null,user=null;
  const requireClient=()=>{if(!client)throw new Error("Supabase is not configured.");};
  return{
    configure:c=>client=c,
    getUser:()=>user,
    async getSession(){
      if(!client)return null;
      const{data,error}=await client.auth.getSession();
      if(error)throw error;
      user=data.session?.user||null;
      return data.session;
    },
    async signUp(email,password,metadata={}){
      requireClient();
      const cfg=window.PYTHONQUEST_SUPABASE||{};
      const options={data:metadata};
      if(cfg.siteUrl)options.emailRedirectTo=`${cfg.siteUrl.replace(/\/$/,"")}/`;
      const{data,error}=await client.auth.signUp({email,password,options});
      if(error)throw error;
      user=data.user||null;
      return data;
    },
    async signIn(email,password){
      requireClient();
      const{data,error}=await client.auth.signInWithPassword({email,password});
      if(error)throw error;
      user=data.user||null;
      return data;
    },
    async signInWithGoogle(){
      requireClient();
      const cfg=window.PYTHONQUEST_SUPABASE||{};
      const options={redirectTo:(cfg.siteUrl||location.origin).replace(/\/$/,"")+"/"};
      const{data,error}=await client.auth.signInWithOAuth({provider:"google",options});
      if(error)throw error;
      return data;
    },
    async signOut(){
      if(!client)return;
      const{error}=await client.auth.signOut();
      if(error)throw error;
      user=null;
    },
    async resetPassword(email){
      requireClient();
      const cfg=window.PYTHONQUEST_SUPABASE||{};
      const redirectTo=`${(cfg.siteUrl||location.origin).replace(/\/$/,"")}/`;
      const{data,error}=await client.auth.resetPasswordForEmail(email,{redirectTo});
      if(error)throw error;
      return data;
    },
    async updatePassword(password){
      requireClient();
      const{data,error}=await client.auth.updateUser({password});
      if(error)throw error;
      user=data.user||user;
      return data;
    },
    async updateProfile(metadata){
      requireClient();
      const{data,error}=await client.auth.updateUser({data:metadata});
      if(error)throw error;
      user=data.user||user;
      return data;
    },
    async resendConfirmation(email){
      requireClient();
      const cfg=window.PYTHONQUEST_SUPABASE||{};
      const options={emailRedirectTo:`${(cfg.siteUrl||location.origin).replace(/\/$/,"")}/`};
      const{data,error}=await client.auth.resend({type:"signup",email,options});
      if(error)throw error;
      return data;
    },
    async loadState(){
      if(!client||!user)return null;
      const{data,error}=await client.from("learner_state").select("state").eq("user_id",user.id).maybeSingle();
      if(error)throw error;
      return data?.state||null;
    },
    async saveState(state){
      if(!client||!user)return;
      const{error}=await client.from("learner_state").upsert({user_id:user.id,state,updated_at:new Date().toISOString()},{onConflict:"user_id"});
      if(error)throw error;
    },
    onAuthStateChange(cb){
      if(!client)return()=>{};
      const{data}=client.auth.onAuthStateChange((event,session)=>{
        user=session?.user||null;
        cb(session,event);
      });
      return()=>data.subscription.unsubscribe();
    }
  };
})();