"use client";

import { openAgent } from "@/lib/actions";
import type { Agent } from "@/lib/mission-control-data";
import { StatusPill } from "./status-pill";

export function OpenClawPanel({ agents, onSelect }: { agents: Agent[]; onSelect: (agent: Agent) => void }) {
  return (
    <section className="panel rounded-sm p-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="font-mono text-xs uppercase text-cyan-200/80">L3 specialist layer</div>
          <h2 className="text-lg font-semibold text-white">OpenClaw Agents</h2>
        </div>
        <span className="font-mono text-xs text-blue-100">136 / 11 squads</span>
      </div>
      <div className="mt-4 grid gap-2">
        {agents.map((agent) => (
          <button
            key={agent.id}
            className="border border-white/10 bg-white/[0.03] p-3 text-left hover:border-cyan-200/40"
            onClick={() => {
              openAgent(agent.id);
              onSelect(agent);
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold text-white">{agent.name}</div>
                <div className="text-xs text-slate-400">{agent.role}</div>
              </div>
              <StatusPill status={agent.status} />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
