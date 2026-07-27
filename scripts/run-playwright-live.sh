#!/usr/bin/env bash
set -euo pipefail
if [[ -f ".env.playwright" ]]; then
  set -a
  source ".env.playwright"
  set +a
fi
: "${PLAYWRIGHT_BASE_URL:=https://pythonquest-pearl.vercel.app}"
export PLAYWRIGHT_BASE_URL
npm run test:e2e
