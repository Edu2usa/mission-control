"use client";

import { useMemo, useState } from "react";
import { ArchitectureMap } from "@/components/architecture-map";
import { AutomationPanel } from "@/components/automation-panel";
import { CommandBar } from "@/components/command-bar";
import { DetailDrawer, type DetailTarget } from "@/components/detail-drawer";
import { HermesPanel } from "@/components/hermes-panel";
import { IntegrationsPanel } from "@/components/integrations-panel";
import { MemoryPanel } from "@/components/memory-panel";
import { ModelRoutingPanel } from "@/components/model-routing-panel";
import { OpenClawPanel } from "@/components/openclaw-panel";
import { agents, automations, designPrinciples, systemNodes } from "@/lib/mission-control-data";

function matches(text: string, query: string) {
  return text.toLowerCase().includes(query.toLowerCase().trim());
}

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [target, setTarget] = useState<DetailTarget>(null);

  const filteredNodes = useMemo(() => {
    return systemNodes.filter((node) => {
      const haystack = [node.name, node.description, node.layer, ...node.tags, ...(node.details ?? [])].join(" ");
      const searchOk = !search || matches(haystack, search);
      const filterOk =
        filter === "All" ||
        (filter === "Active" && ["active", "operational"].includes(node.status)) ||
        (filter === "Needs Attention" && node.status === "needs_attention") ||
        (filter === "Local" && node.tags.includes("local")) ||
        (filter === "Cloud" && node.tags.includes("cloud"));
      return searchOk && filterOk;
    });
  }, [filter, search]);

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => !search || matches([agent.name, agent.role, agent.description, agent.squad ?? "", ...agent.capabilities].join(" "), search));
  }, [search]);

  const filteredAutomations = useMemo(() => {
    return automations.filter((automation) => !search || matches([automation.name, automation.schedule, automation.owner, automation.nextRun].join(" "), search));
  }, [search]);

  const hermes = systemNodes.find((node) => node.id === "hermes");
  const memoryNodes = filteredNodes.filter((node) => node.layer === "data" || node.id === "obsidian-interface");
  const modelNodes = filteredNodes.filter((node) => node.layer === "model");
  const integrationNodes = filteredNodes.filter((node) => node.layer === "integration");

  return (
    <main className="min-h-screen px-3 py-4 text-white md:px-5 lg:px-7">
      <div className="mx-auto flex max-w-[1800px] flex-col gap-4">
        <CommandBar search={search} onSearch={setSearch} filter={filter} onFilter={setFilter} />

        <section className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,.55fr)]">
          <div className="grid gap-4">
            <ArchitectureMap nodes={filteredNodes.length ? filteredNodes : systemNodes} onSelect={(node) => setTarget({ type: "node", item: node })} />
            <div className="grid gap-4 lg:grid-cols-2">
              <HermesPanel hermes={hermes} onSelect={(node) => setTarget({ type: "node", item: node })} />
              <OpenClawPanel agents={filteredAgents} onSelect={(agent) => setTarget({ type: "agent", item: agent })} />
            </div>
          </div>

          <aside className="grid gap-4">
            <AutomationPanel automations={filteredAutomations} onSelect={(automation) => setTarget({ type: "automation", item: automation })} />
            <MemoryPanel nodes={memoryNodes} onSelect={(node) => setTarget({ type: "node", item: node })} />
            <ModelRoutingPanel nodes={modelNodes} onSelect={(node) => setTarget({ type: "node", item: node })} />
            <IntegrationsPanel nodes={integrationNodes} onSelect={(node) => setTarget({ type: "node", item: node })} />
          </aside>
        </section>

        <footer className="panel rounded-sm p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="font-mono text-xs uppercase text-cyan-200/80">Design Principles</div>
              <p className="text-sm text-slate-300">The dashboard answers operational status, orchestration, execution, memory, model routing, integrations, and command flow at a glance.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {designPrinciples.map((principle) => (
                <span key={principle} className="border border-cyan-200/20 bg-cyan-300/10 px-2.5 py-1.5 text-xs text-cyan-50">
                  {principle}
                </span>
              ))}
            </div>
          </div>
        </footer>
      </div>

      <DetailDrawer target={target} onClose={() => setTarget(null)} />
    </main>
  );
}
