import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export const config = { api: { bodyParser: false } };

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({error:"Method not allowed"});
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(503).json({error:"Stripe webhook is not configured"});
  }

  const rawBody = await readRawBody(req);
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).json({error:`Webhook signature verification failed: ${error.message}`});
  }

  // Production persistence requirements:
  // - insert event.id into webhook_events with a unique constraint
  // - return 200 immediately if event.id was already processed
  // - update entitlement state in one database transaction
  // - write an entitlement_history audit record
  // - reconcile checkout.session.completed, invoice.paid,
  //   invoice.payment_failed, customer.subscription.updated,
  //   customer.subscription.deleted, charge.refunded

  return res.status(200).json({
    received:true,
    eventId:event.id,
    eventType:event.type
  });
}
