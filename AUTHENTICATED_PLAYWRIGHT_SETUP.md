# Authenticated Playwright Setup

Create a dedicated CodeQuest test account in Supabase. Do not use a personal account.

```bash
cp .env.playwright.example .env.playwright
```

Edit `.env.playwright` with the seeded test email and password, then run:

```bash
npm install
npx playwright install chromium
npm run test:e2e:live
```

Without credentials, authenticated tests are skipped while public tests continue to run.
