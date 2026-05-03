"use client";

import { Bot, Database, FolderOpen, Play, RefreshCw, Search } from "lucide-react";
import { openVault, refreshSystemStatus, runSkill, searchMemory, triggerAutomation } from "@/lib/actions";
import { StatusPill } from "./status-pill";

export function CommandBar({
  search,
  onSearch,
  filter,
  onFilter,
  lastSync,
  onRefresh,
}: {
  search: string;
  onSearch: (value: string) => void;
  filter: string;
  onFilter: (value: string) => void;
  lastSync: string;
  onRefresh: () => void;
}) {
  const filters = ["All", "Active", "Needs Attention", "Local", "Cloud"];

  return (
    <header className="panel sticky top-0 z-40 rounded-sm p-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold text-white md:text-3xl">Ed&apos;s AI Mission Control</h1>
            <StatusPill status="operational" />
          </div>
          <p className="mt-1 text-sm text-slate-300">Hermes + OpenClaw architecture on Prometheus-1</p>
          <div className="mt-2 flex flex-wrap gap-2 font-mono text-[11px] uppercase text-cyan-100/75">
            <span>Prometheus-1</span>
            <span>Ubuntu WSL2</span>
            <span>Last sync: {lastSync}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:min-w-[620px]">
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="flex min-w-0 flex-1 items-center gap-2 border border-cyan-200/20 bg-black/20 px-3 py-2 text-slate-300">
              <Search size={16} className="shrink-0 text-cyan-100" />
              <input
                value={search}
                onChange={(event) => onSearch(event.target.value)}
                placeholder="Search modules, agents, automations..."
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </label>
            <button
              className="inline-flex items-center justify-center gap-2 border border-cyan-200/30 px-3 py-2 text-sm text-cyan-50 hover:bg-cyan-300/10"
              onClick={() => {
                refreshSystemStatus();
                onRefresh();
              }}
            >
              <RefreshCw size={15} /> Refresh
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                className={`border px-3 py-1.5 text-xs ${filter === item ? "border-cyan-200 bg-cyan-300/15 text-white" : "border-white/10 text-slate-300 hover:border-cyan-200/40"}`}
                onClick={() => onFilter(item)}
              >
                {item}
              </button>
            ))}
            <button className="ml-auto inline-flex items-center gap-1.5 border border-white/10 px-2.5 py-1.5 text-xs text-slate-200 hover:border-cyan-200/40" onClick={() => runSkill("hermes-default")}>
              <Bot size={14} /> Run Skill
            </button>
            <button className="inline-flex items-center gap-1.5 border border-white/10 px-2.5 py-1.5 text-xs text-slate-200 hover:border-cyan-200/40" onClick={() => openVault()}>
              <FolderOpen size={14} /> Open Vault
            </button>
            <button className="inline-flex items-center gap-1.5 border border-white/10 px-2.5 py-1.5 text-xs text-slate-200 hover:border-cyan-200/40" onClick={() => searchMemory(search)}>
              <Database size={14} /> Search Memory
            </button>
            <button className="inline-flex items-center gap-1.5 border border-white/10 px-2.5 py-1.5 text-xs text-slate-200 hover:border-cyan-200/40" onClick={() => triggerAutomation("quick-trigger")}>
              <Play size={14} /> Trigger
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
