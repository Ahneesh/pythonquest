# CodeQuest AI Mentor Server Proxy

The browser must never contain an OpenAI or other model-provider secret.

Configure `config/ai-mentor-config.json` with a server endpoint that:

1. authenticates the CodeQuest user;
2. rate-limits requests;
3. validates mode and payload size;
4. applies the teaching policy;
5. calls the model provider using a server-side secret;
6. returns `{ "reply": "..." }`;
7. logs only safe metadata.

The local pedagogical engine remains available when no endpoint is configured.
