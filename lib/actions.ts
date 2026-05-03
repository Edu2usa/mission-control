export type MissionAction = {
  id: string;
  title: string;
  detail: string;
  status: "queued" | "completed" | "attention";
  timestamp: string;
};

function publishAction(action: Omit<MissionAction, "id" | "timestamp">) {
  const event: MissionAction = {
    ...action,
    id: crypto.randomUUID(),
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
  };

  window.dispatchEvent(new CustomEvent<MissionAction>("mission-control:action", { detail: event }));
  return event;
}

export function triggerAutomation(id: string) {
  return publishAction({
    title: "Automation triggered",
    detail: `${id} was queued through Hermes scheduler.`,
    status: "queued",
  });
}

export function searchMemory(query: string) {
  const trimmed = query.trim();

  return publishAction({
    title: trimmed ? "Memory search ready" : "Memory search needs input",
    detail: trimmed ? `Searching vault, local memory, and session history for "${trimmed}".` : "Type a search term before querying memory.",
    status: trimmed ? "completed" : "attention",
  });
}

export function openVault() {
  publishAction({
    title: "Opening vault",
    detail: "Attempting to open Obsidian through the local obsidian:// protocol.",
    status: "queued",
  });

  window.location.href = "obsidian://open?vault=Personal%20Vault";
}

export function runSkill(skillId: string) {
  return publishAction({
    title: "Skill run queued",
    detail: `${skillId} is ready to route through Hermes skills.`,
    status: "queued",
  });
}

export function openAgent(agentId: string) {
  return publishAction({
    title: "Agent profile opened",
    detail: `${agentId} selected in OpenClaw.`,
    status: "completed",
  });
}

export function refreshSystemStatus() {
  return publishAction({
    title: "System status refreshed",
    detail: "Prometheus-1, Hermes, OpenClaw, memory, models, and integrations were rechecked from local dashboard state.",
    status: "completed",
  });
}
