# CodeQuest Deployment Learning Guide

v48 uses a simulated deployment pipeline. It teaches release structure and evidence but does
not publish arbitrary learner code directly to external hosts.

## Safe production principles

- Never embed private API keys in browser code.
- Use environment variables only in trusted server environments.
- Verify application health after deployment.
- Record a rollback or recovery strategy.
- Treat generated deployment configuration as a starting point and review it before use.
- Use real provider documentation when deploying to an external platform.

## Web applications

Static HTML, CSS and JavaScript can be exported as a project bundle. The learner can then
publish it through GitHub Pages, Vercel or another static host.

## Backend services

Python and Java deployment tracks are educational simulations. Real deployment requires an
appropriate runtime, dependency configuration, secure environment variables and operational
monitoring.

## SQL changes

Database changes should be versioned, reviewed and tested in a non-production environment
before production execution.
