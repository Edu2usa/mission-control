"use client";

import type { SystemNode } from "@/lib/mission-control-data";
import { FlowLegend } from "./flow-legend";
import { SystemNode as NodeCard } from "./system-node";

export function ArchitectureMap({ nodes, onSelect }: { nodes: SystemNode[]; onSelect: (node: SystemNode) => void }) {
  const byLayer = (layer: SystemNode["layer"]) => nodes.filter((node) => node.layer === layer);
  const hermes = nodes.find((node) => node.id === "hermes");
  const openclaw = nodes.find((node) => node.id === "openclaw");
  const prometheus = nodes.find((node) => node.id === "prometheus");

  return (
    <section className="panel relative overflow-hidden rounded-sm p-4 lg:p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="font-mono text-xs uppercase text-cyan-200/80">L0 system architecture</div>
          <h2 className="text-xl font-semibold text-white">Command to execution flow</h2>
        </div>
        <FlowLegend />
      </div>

      <div className="relative grid gap-4">
        <svg className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 1000 760" preserveAspectRatio="none">
          <defs>
            <marker id="arrow" markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4">
              <path d="M0,0 L8,4 L0,8 Z" fill="#67e8f9" />
            </marker>
          </defs>
          <path className="glow-line flow-dash" d="M500 105 L500 266" stroke="#67e8f9" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          <path className="glow-line" d="M500 420 L500 515" stroke="#f8fafc" strokeWidth="1.4" fill="none" markerEnd="url(#arrow)" />
          <path d="M500 638 L500 700" stroke="rgba(248,250,252,.55)" strokeWidth="1" fill="none" />
          <path d="M245 360 C140 360 142 535 250 535" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="8 9" fill="none" />
          <path d="M755 360 C870 360 860 530 740 530" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="8 9" fill="none" />
          <path d="M340 350 L185 350" stroke="#67e8f9" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
          <path d="M660 350 L815 350" stroke="#67e8f9" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
        </svg>

        <div className="grid gap-3 lg:grid-cols-4">
          {byLayer("interface").map((node) => (
            <NodeCard key={node.id} node={node} compact onSelect={onSelect} />
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr_1fr] lg:items-center">
          <div className="grid gap-3">
            {byLayer("data").map((node) => (
              <NodeCard key={node.id} node={node} compact onSelect={onSelect} />
            ))}
          </div>

          {hermes && (
            <button type="button" onClick={() => onSelect(hermes)} className="relative rounded-sm border border-cyan-200/50 bg-cyan-300/10 p-5 text-left shadow-[0_0_45px_rgba(34,211,238,.16)] transition hover:bg-cyan-300/15">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-xs uppercase text-cyan-100">Control Plane</div>
                  <h3 className="mt-1 text-3xl font-semibold text-white">Hermes</h3>
                  <p className="mt-2 text-sm text-slate-300">AI orchestration backbone in /home/prometheus/.hermes</p>
                </div>
                <span className="border border-cyan-100/40 px-2 py-1 font-mono text-xs text-cyan-50">OPERATIONAL</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-3">
                {hermes.details?.map((detail) => (
                  <span key={detail} className="border border-white/10 bg-black/20 px-2 py-2 text-xs text-slate-200">
                    {detail}
                  </span>
                ))}
              </div>
            </button>
          )}

          <div className="grid gap-3">
            {byLayer("model").concat(byLayer("integration")).map((node) => (
              <NodeCard key={node.id} node={node} compact onSelect={onSelect} />
            ))}
          </div>
        </div>

        {openclaw && (
          <button type="button" onClick={() => onSelect(openclaw)} className="rounded-sm border border-blue-300/35 bg-blue-400/10 p-4 text-left transition hover:border-cyan-200/60">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-mono text-xs uppercase text-blue-100">Execution Swarm</div>
                <h3 className="text-2xl font-semibold text-white">OpenClaw</h3>
              </div>
              <p className="text-sm text-slate-300">136 agents across 11 squads, connected beneath Hermes</p>
            </div>
          </button>
        )}

        {prometheus && <NodeCard node={prometheus} onSelect={onSelect} />}
      </div>
    </section>
  );
}
