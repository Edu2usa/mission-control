"use client";

import { Play } from "lucide-react";
import { triggerAutomation } from "@/lib/actions";
import type { Automation } from "@/lib/mission-control-data";
import { StatusPill } from "./status-pill";

export function AutomationPanel({ automations, onSelect }: { automations: Automation[]; onSelect: (automation: Automation) => void }) {
  return (
    <section className="panel rounded-sm p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="font-mono text-xs uppercase text-cyan-200/80">Active ops dashboard</div>
          <h2 className="text-lg font-semibold text-white">Live Automations</h2>
        </div>
        <span className="text-xs text-cyan-100">{automations.length} active</span>
      </div>
      <div className="mt-4 grid gap-2">
        {automations.map((automation) => (
          <div key={automation.id} className="border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-white">{automation.name}</div>
                <div className="mt-1 text-xs text-slate-400">{automation.schedule} · next {automation.nextRun}</div>
              </div>
              <StatusPill status={automation.status} />
            </div>
            <div className="mt-3 flex gap-2">
              <button className="inline-flex items-center gap-1 border border-cyan-200/30 px-2 py-1 text-xs text-cyan-50 hover:bg-cyan-300/10" onClick={() => triggerAutomation(automation.id)}>
                <Play size={12} /> Run Now
              </button>
              <button className="border border-white/10 px-2 py-1 text-xs text-slate-200 hover:border-cyan-200/40" onClick={() => onSelect(automation)}>
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
