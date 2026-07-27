# Isolated Runner Reference

Real Java and unrestricted multi-file execution must run in an isolated container or microVM.

Required controls:

- no external network;
- non-root user;
- read-only base image;
- temporary workspace;
- CPU, memory and wall-time limits;
- output and file-size limits;
- automatic cleanup;
- server-owned hidden tests.

Endpoint: `POST /api/runner/execute`

This package intentionally does not deploy an unsafe arbitrary-code execution endpoint.
