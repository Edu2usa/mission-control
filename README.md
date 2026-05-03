# Ed's AI Mission Control

Mission-control dashboard for Eduardo Oliveira's Hermes + OpenClaw AI operating system on Prometheus-1.

## What It Shows

- Prometheus-1 operational status
- Hermes control plane modules
- OpenClaw execution swarm and named agents
- Live automations
- Memory and data stores
- Model routing providers
- External integrations
- Command flow from Ed to Hermes to OpenClaw

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run lint
npm run build
```

## Future Integration Points

Mock data lives in `lib/mission-control-data.ts`.

Placeholder actions live in `lib/actions.ts`:

- `triggerAutomation(id)`
- `searchMemory(query)`
- `openVault()`
- `runSkill(skillId)`
- `openAgent(agentId)`
- `refreshSystemStatus()`

Replace those with Hermes Gateway, Supabase, Obsidian, and deployment workflow calls when the real endpoints are ready.
