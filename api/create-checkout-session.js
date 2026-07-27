import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const PLAN_CONFIG = {
  starter_15_day: {
    mode: "payment",
    priceEnv: "STRIPE_PRICE_STARTER_15_DAY"
  },
  pro_monthly: {
    mode: "subscription",
    priceEnv: "STRIPE_PRICE_PRO_MONTHLY"
  },
  pro_annual: {
    mode: "subscription",
    priceEnv: "STRIPE_PRICE_PRO_ANNUAL"
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({error:"Method not allowed"});
  if (!stripe) return res.status(503).json({error:"Stripe is not configured"});

  const { planId, successUrl, cancelUrl, userId, email } = req.body || {};
  const plan = PLAN_CONFIG[planId];
  if (!plan) return res.status(400).json({error:"Invalid plan"});
  if (!userId) return res.status(401).json({error:"Authenticated user required"});

  const priceId = process.env[plan.priceEnv];
  if (!priceId) return res.status(503).json({error:`Missing ${plan.priceEnv}`});

  const session = await stripe.checkout.sessions.create({
    mode: plan.mode,
    line_items: [{price: priceId, quantity: 1}],
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: email || undefined,
    client_reference_id: userId,
    metadata: {userId, planId},
    subscription_data: plan.mode === "subscription"
      ? {metadata: {userId, planId}}
      : undefined,
    payment_intent_data: plan.mode === "payment"
      ? {metadata: {userId, planId}}
      : undefined,
    allow_promotion_codes: true
  });

  return res.status(200).json({url: session.url, sessionId: session.id});
}
