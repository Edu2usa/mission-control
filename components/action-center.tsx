"use client";

import { useEffect, useState } from "react";
import { Activity, CheckCircle2, Clock3, TriangleAlert, X } from "lucide-react";
import type { MissionAction } from "@/lib/actions";

const icons = {
  queued: Clock3,
  completed: CheckCircle2,
  attention: TriangleAlert,
};

const styles = {
  queued: "border-blue-300/30 text-blue-100",
  completed: "border-cyan-300/30 text-cyan-100",
  attention: "border-amber-300/40 text-amber-100",
};

export function ActionCenter() {
  const [actions, setActions] = useState<MissionAction[]>([]);

  useEffect(() => {
    function handleAction(event: Event) {
      const action = (event as CustomEvent<MissionAction>).detail;
      setActions((current) => [action, ...current].slice(0, 5));
    }

    window.addEventListener("mission-control:action", handleAction);
    return () => window.removeEventListener("mission-control:action", handleAction);
  }, []);

  if (!actions.length) return null;

  return (
    <section className="panel fixed bottom-4 right-4 z-50 w-[min(420px,calc(100vw-2rem))] rounded-sm p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-xs uppercase text-cyan-200">
          <Activity size={14} />
          Ops Activity
        </div>
        <button className="grid h-7 w-7 place-items-center border border-white/10 text-slate-300 hover:border-cyan-200/40" onClick={() => setActions([])} aria-label="Clear activity">
          <X size={13} />
        </button>
      </div>
      <div className="mt-3 grid gap-2">
        {actions.map((action) => {
          const Icon = icons[action.status];

          return (
            <div key={action.id} className={`border bg-white/[0.03] p-2 ${styles[action.status]}`}>
              <div className="flex items-start gap-2">
                <Icon size={15} className="mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-sm font-semibold text-white">{action.title}</span>
                    <span className="font-mono text-[10px] uppercase text-slate-400">{action.timestamp}</span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-300">{action.detail}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
