# Production Billing Setup

Required server environment variables:

- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- STRIPE_PRICE_STARTER_15_DAY
- STRIPE_PRICE_PRO_MONTHLY
- STRIPE_PRICE_PRO_ANNUAL

The Starter Pack must use Stripe Checkout `mode: payment`.
Monthly and annual plans must use `mode: subscription`.

Run the Supabase migration in:

`supabase/migrations/20260718_codequest_commercial_os.sql`

The browser must not be treated as the source of truth for plan access.
Webhook processing must be idempotent and update entitlement history in one transaction.
