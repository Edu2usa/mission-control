export function triggerAutomation(id: string) {
  console.log("[mission-control] triggerAutomation", id);
}

export function searchMemory(query: string) {
  console.log("[mission-control] searchMemory", query);
}

export function openVault() {
  console.log("[mission-control] openVault");
}

export function runSkill(skillId: string) {
  console.log("[mission-control] runSkill", skillId);
}

export function openAgent(agentId: string) {
  console.log("[mission-control] openAgent", agentId);
}

export function refreshSystemStatus() {
  console.log("[mission-control] refreshSystemStatus");
}
