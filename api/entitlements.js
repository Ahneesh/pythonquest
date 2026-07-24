export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({error:"Method not allowed"});

  // Production implementation:
  // 1. Verify the authenticated user from the server session.
  // 2. Query the Supabase entitlements table using server credentials.
  // 3. Never accept userId as an authority from the browser.
  // 4. Return only the current user's entitlement and usage state.

  return res.status(501).json({
    error:"Connect this endpoint to authenticated Supabase entitlement lookup"
  });
}
