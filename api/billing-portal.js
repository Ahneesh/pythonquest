import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({error:"Method not allowed"});
  if (!stripe) return res.status(503).json({error:"Stripe is not configured"});

  const {customerId, returnUrl} = req.body || {};
  if (!customerId) return res.status(400).json({error:"Missing Stripe customer"});

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl
  });

  return res.status(200).json({url: session.url});
}
