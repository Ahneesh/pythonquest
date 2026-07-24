# CodeQuest Academy authentication setup

## 1. Edit config/supabase-config.js

Use plain straight quotes:

```javascript
window.PYTHONQUEST_SUPABASE = {
  url: "https://YOUR_PROJECT_REF.supabase.co",
  anonKey: "YOUR_PUBLIC_ANON_KEY",
  siteUrl: "https://YOUR_VERCEL_DOMAIN.vercel.app",
  requireAuth: true,
  allowGoogle: true
};
```

Do not use smart quotes such as “ ” or ‘ ’.

## 2. Supabase

- Run `supabase-schema.sql`.
- Authentication > URL Configuration:
  - Site URL: production Vercel URL
  - Redirect URL: production URL followed by `/**`
- Enable Email provider and Confirm email.
- Enable Google only after adding its Client ID and Client Secret.

## 3. Clear old deployment cache

After pushing:
- redeploy in Vercel, or push a new commit;
- hard refresh with Ctrl/Cmd + Shift + R;
- unregister the old service worker if stale files remain.


## v25.2 startup fix

Authentication handlers now bind before optional learning controls. Missing or stale timer,
search, lesson, or project elements no longer prevent sign-in and sign-up from working.

After deployment, clear the previous service worker once:

1. DevTools > Application > Service Workers > Unregister
2. Application > Storage > Clear site data
3. Hard refresh


## v25.4 authenticated application router fix

The complete application-routing block has been restored, including:

- Dashboard
- Course map
- Revision
- Practice arena
- Projects
- Account & Security

Authenticated users are now routed to the dashboard, and a top-bar Sign out control is visible.


## CodeQuest Academy branding

Set the Supabase SMTP sender name to `CodeQuest Academy`. Keep `contact@applypilotpro.co.uk` during the transition. Update confirmation and recovery templates to use the CodeQuest Academy name.
