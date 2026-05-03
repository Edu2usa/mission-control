export type Status = "operational" | "active" | "idle" | "needs_attention";

export type SystemNode = {
  id: string;
  name: string;
  layer:
    | "interface"
    | "hermes"
    | "openclaw"
    | "infrastructure"
    | "data"
    | "model"
    | "integration";
  description: string;
  status: Status;
  icon: string;
  tags: string[];
  details?: string[];
  commands?: string[];
};

export type Automation = {
  id: string;
  name: string;
  schedule: string;
  status: "active" | "paused" | "needs_attention";
  nextRun: string;
  owner: "Hermes" | "OpenClaw";
};

export type Agent = {
  id: string;
  name: string;
  role: string;
  squad?: string;
  status: "active" | "idle" | "needs_attention";
  description: string;
  capabilities: string[];
};

export const systemNodes: SystemNode[] = [
  { id: "ed", name: "Ed", layer: "interface", description: "One operator directing the system through remote-first command surfaces.", status: "operational", icon: "user", tags: ["operator", "control"] },
  { id: "telegram", name: "Telegram", layer: "interface", description: "Primary remote control surface for commands, alerts, and quick approvals.", status: "active", icon: "message-circle", tags: ["remote", "primary"] },
  { id: "discord", name: "Discord", layer: "interface", description: "Coordination layer for channels, status, and team-style operations.", status: "active", icon: "messages-square", tags: ["coordination", "channels"] },
  { id: "obsidian-interface", name: "Obsidian Vault", layer: "interface", description: "Markdown knowledge surface and long-term context base.", status: "active", icon: "book-open", tags: ["vault", "knowledge", "local"] },
  {
    id: "hermes",
    name: "Hermes",
    layer: "hermes",
    description: "AI orchestration backbone running in /home/prometheus/.hermes.",
    status: "operational",
    icon: "network",
    tags: ["control plane", "gateway", "skills"],
    details: ["CLI", "Skills ecosystem", "Cron scheduler", "Gateway", "Memory", "MCP bridges", "Session search", "Tool calling", "Red persona broker/fixer"],
    commands: ["run skill", "delegate task", "search session", "route model"],
  },
  {
    id: "openclaw",
    name: "OpenClaw",
    layer: "openclaw",
    description: "Agent squad layer: 136 agents across 11 squads.",
    status: "active",
    icon: "blocks",
    tags: ["execution swarm", "specialists"],
    details: ["Strategy", "Operations", "Compliance", "Routing", "Email"],
  },
  {
    id: "prometheus",
    name: "Prometheus-1",
    layer: "infrastructure",
    description: "Ubuntu WSL2 machine hosting local files, runtimes, repos, and automations.",
    status: "operational",
    icon: "server",
    tags: ["ubuntu", "wsl2", "local"],
    details: ["Local filesystem", "Node services", "Python runtime", "Git-based repos", "Automation environment"],
  },
  { id: "supabase", name: "Supabase", layer: "data", description: "Structured backend and shared memory store.", status: "active", icon: "database", tags: ["cloud", "memory"] },
  { id: "local-memory", name: "Local Memory Files", layer: "data", description: "Local context, notes, logs, and durable state files.", status: "active", icon: "files", tags: ["local", "memory"] },
  { id: "session-history", name: "Session History", layer: "data", description: "Searchable previous interactions and compaction checkpoints.", status: "active", icon: "history", tags: ["memory", "sessions"] },
  { id: "openrouter", name: "OpenRouter", layer: "model", description: "Default model routing layer for broad provider access.", status: "active", icon: "route", tags: ["cloud", "preferred"] },
  { id: "anthropic", name: "Anthropic", layer: "model", description: "Deep reasoning provider for heavyweight analysis.", status: "active", icon: "brain", tags: ["cloud", "reasoning"] },
  { id: "ollama", name: "Ollama", layer: "model", description: "Local models for cheap, private, and offline tasks.", status: "idle", icon: "cpu", tags: ["local", "offline"] },
  { id: "chrome-mcp", name: "Windows Chrome MCP", layer: "integration", description: "Bridge from Hermes into live browser and Windows Chrome control.", status: "active", icon: "monitor", tags: ["mcp", "browser", "local"] },
  { id: "deploy", name: "Vercel Deploy Workflows", layer: "integration", description: "Deployment pipeline surface for app publishing and verification.", status: "idle", icon: "rocket", tags: ["cloud", "deploy"] },
];

export const agents: Agent[] = [
  { id: "atlas", name: "ATLAS", role: "Strategy", squad: "Command", status: "active", description: "Strategy, planning, and high-level direction.", capabilities: ["roadmaps", "decision framing", "operator briefings"] },
  { id: "oliver", name: "OLIVER", role: "Operations and payroll", squad: "Operations", status: "active", description: "Operational admin, hours, payroll, and recurring business checks.", capabilities: ["payroll hours", "forms audits", "vendor tracking"] },
  { id: "aria", name: "ARIA", role: "Compliance", squad: "Risk", status: "idle", description: "Compliance review and structured risk checks.", capabilities: ["policy review", "audit trails", "document checks"] },
  { id: "leonidas", name: "LEONIDAS", role: "Routing", squad: "Routing", status: "active", description: "Routes tasks to the right squad or specialist.", capabilities: ["triage", "handoffs", "priority routing"] },
  { id: "courier", name: "COURIER", role: "Email", squad: "Comms", status: "active", description: "Email processing, drafts, follow-ups, and delivery support.", capabilities: ["inbox triage", "reply drafts", "notification delivery"] },
];

export const automations: Automation[] = [
  { id: "payroll-mon", name: "Run Payroll Hours", schedule: "Monday 8am", status: "active", nextRun: "Mon 8:00 AM", owner: "Hermes" },
  { id: "payroll-sat", name: "Run Payroll Hours", schedule: "Saturday 8am", status: "active", nextRun: "Sat 8:00 AM", owner: "Hermes" },
  { id: "forms", name: "Google Forms Job Sheet Check", schedule: "Daily 8am", status: "active", nextRun: "Tomorrow 8:00 AM", owner: "Hermes" },
  { id: "vault-audit", name: "Weekly Vault Audit", schedule: "Weekly", status: "active", nextRun: "Friday 9:00 AM", owner: "OpenClaw" },
  { id: "compaction", name: "Session Compaction Checkpoints", schedule: "Adaptive", status: "active", nextRun: "On threshold", owner: "Hermes" },
  { id: "stoic", name: "Stoic Quote", schedule: "Hourly", status: "active", nextRun: "Next hour", owner: "Hermes" },
];

export const designPrinciples = [
  "one operator, many agents",
  "orchestration over chaos",
  "memory + automation + delegation",
  "Telegram-first remote operations",
  "local + cloud hybrid AI stack",
];
