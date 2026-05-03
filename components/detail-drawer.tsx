"use client";

import { X } from "lucide-react";
import { openAgent, openVault, runSkill, searchMemory, triggerAutomation } from "@/lib/actions";
import type { Agent, Automation, SystemNode } from "@/lib/mission-control-data";
import { StatusPill } from "./status-pill";

export type DetailTarget =
  | { type: "node"; item: SystemNode }
  | { type: "agent"; item: Agent }
  | { type: "automation"; item: Automation }
  | null;

export function DetailDrawer({ target, onClose }: { target: DetailTarget; onClose: () => void }) {
  if (!target) return null;

  const title = target.item.name;
  const status = target.item.status;
  const description =
    target.type === "automation"
      ? `${target.item.owner} owns this automation. It is scheduled for ${target.item.schedule}.`
      : target.item.description;

  const list =
    target.type === "node"
      ? target.item.details ?? target.item.tags
      : target.type === "agent"
        ? target.item.capabilities
        : ["Run now", "View schedule", "Queue schedule review"];

  const primaryAction =
    target.type === "automation"
      ? () => triggerAutomation(target.item.id)
      : target.type === "agent"
        ? () => openAgent(target.item.id)
        : target.item.id === "obsidian-interface"
          ? () => openVault()
          : target.item.id === "hermes"
            ? () => runSkill("hermes-control-plane")
            : () => searchMemory(target.item.name);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/45" onClick={onClose}>
      <aside className="panel h-full w-full max-w-md overflow-y-auto border-l border-cyan-200/25 p-5" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase text-cyan-200">{target.type}</div>
            <h2 className="mt-1 text-2xl font-semibold text-white">{title}</h2>
          </div>
          <button className="grid h-9 w-9 place-items-center border border-white/15 text-slate-200 hover:border-cyan-200/50" onClick={onClose} aria-label="Close details">
            <X size={16} />
          </button>
        </div>

        <div className="mt-4">
          <StatusPill status={status} />
        </div>
        <p className="mt-5 text-sm leading-6 text-slate-300">{description}</p>

        <div className="mt-6 grid gap-3">
          <div className="font-mono text-xs uppercase text-cyan-200/80">Capabilities / related systems</div>
          {list.map((item) => (
            <div key={item} className="border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-200">
              {item}
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <button className="border border-cyan-200/35 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-50 hover:bg-cyan-300/15" onClick={primaryAction}>
            Execute Action
          </button>
          <button className="border border-white/10 px-3 py-2 text-sm text-slate-200 hover:border-cyan-200/40" onClick={() => searchMemory(title)}>
            Search Related
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
          <div className="border border-cyan-200/15 p-3">
            <div className="font-mono uppercase text-slate-500">Last activity</div>
            <div className="mt-1 text-cyan-100">Just now</div>
          </div>
          <div className="border border-cyan-200/15 p-3">
            <div className="font-mono uppercase text-slate-500">Connection</div>
            <div className="mt-1 text-cyan-100">Hermes-ready</div>
          </div>
        </div>
      </aside>
    </div>
  );
}
