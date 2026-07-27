export async function mentorRoute(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  // Authenticate user and validate payload here.
  // Call the model provider from this server-side environment only.
  return res.status(501).json({
    error: "Configure the server-side model provider before enabling remote AI."
  });
}
