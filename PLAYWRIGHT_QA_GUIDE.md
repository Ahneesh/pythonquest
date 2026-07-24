# Playwright QA Guide

Install browser dependencies once:

```bash
npm install
npx playwright install chromium
```

Run the application locally, then:

```bash
npm run test:e2e
```

For a deployed environment:

```bash
PLAYWRIGHT_BASE_URL=https://your-domain.example npm run test:e2e
```

The included suite covers the public landing, pricing visibility, onboarding interaction,
mobile usability and immediate page errors. Authenticated and Stripe tests require seeded test
users and Stripe test-mode credentials.
