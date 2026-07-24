export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({error:"Method not allowed"});

  const {category, description, route, appVersion, browser, includeDiagnostics} = req.body || {};
  if (!category || !description || description.trim().length < 10) {
    return res.status(400).json({error:"Please provide a category and a useful description."});
  }

  // Production implementation:
  // - verify authenticated user when available
  // - sanitise all text
  // - enforce rate and payload limits
  // - store only the fields the user consented to send
  // - never include lesson notes or source code automatically
  // - write to a Supabase feedback_reports table or support provider

  return res.status(501).json({
    error:"Feedback storage is not configured",
    acceptedForLocalFallback:true,
    summary:{category, route, appVersion, browser, includeDiagnostics:Boolean(includeDiagnostics)}
  });
}
