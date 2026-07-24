# CodeQuest v41 Supabase Production Setup

## 1. Run migrations

Open Supabase SQL Editor and run, in order:

1. `supabase/migrations/202607170001_codequest_cloud_schema.sql`
2. `supabase/migrations/202607170002_codequest_rls.sql`
3. `supabase/migrations/202607170003_codequest_functions.sql`

## 2. Keep browser credentials public-safe

`config/supabase-config.js` must contain only:

- Project URL
- Publishable/anon key

Never place the service-role key in the browser.

## 3. Verify authentication redirects

Add your production and preview URLs under:

Authentication → URL Configuration

## 4. Test roles

Create separate accounts for:

- learner
- instructor
- organisation administrator

Verify that learners cannot read other learners' submissions or intervention notes.

## 5. Create first organisation

Use Organisation → Create organisation, then add an organisation membership in Supabase.

## 6. Production warnings

- Public credential verification should expose only the intended fields.
- Hidden tests must remain server-side.
- Instructor and organisation-admin permissions must be tested with real accounts.
- Audit writes should eventually be moved to database triggers or secure server functions.
