export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({error:"Method not allowed"});

  // Production implementation must prevent:
  // - self-referrals
  // - duplicate rewards
  // - repeated disposable-email signups
  // - rewards before the invited learner passes the first exercise

  return res.status(501).json({
    error:"Connect referral validation to authenticated Supabase records"
  });
}
