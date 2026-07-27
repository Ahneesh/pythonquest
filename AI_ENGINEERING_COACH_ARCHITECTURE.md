# AI Engineering Coach Architecture

The browser provides a deterministic local fallback coach. Production AI must run through `/api/engineering-coach`, authenticate users, rate-limit requests, redact secrets, enforce payload limits and keep provider keys server-side.
