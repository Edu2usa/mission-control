"use client";

import { Bot } from "lucide-react";
import type { SystemNode } from "@/lib/mission-control-data";

export function HermesPanel({ hermes, onSelect }: { hermes?: SystemNode; onSelect: (node: SystemNode) => void }) {
  if (!hermes) return null;

  return (
    <section className="panel rounded-sm p-4">
      <div className="flex items-center gap-2">
        <Bot size={18} className="text-cyan-100" />
        <h2 className="text-lg font-semibold text-white">Hermes Control Plane</h2>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-300">Manages commands, context, skills, cron jobs, delegation, memory, messaging gateway, MCP integrations, and Red as broker/fixer.</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {hermes.details?.map((item) => (
          <button key={item} className="border border-white/10 bg-white/[0.03] px-2 py-2 text-left text-xs text-slate-200 hover:border-cyan-200/40" onClick={() => onSelect(hermes)}>
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}
