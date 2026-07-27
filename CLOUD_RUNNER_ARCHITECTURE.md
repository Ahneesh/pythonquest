# Cloud Runner Architecture

Verified code must execute in isolated ephemeral environments. Hidden tests, credentials and infrastructure access must never be delivered to the browser. Enforce authentication, rate limits, CPU/memory/disk/time/output quotas, blocked networking, temporary filesystems and automatic destruction. Runtime targets: Python 3.12 + pytest, PostgreSQL 16, Playwright, and Java 21 + Maven/JUnit.
