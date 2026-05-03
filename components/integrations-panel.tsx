"use client";

import type { SystemNode } from "@/lib/mission-control-data";
import { SystemNode as NodeCard } from "./system-node";

export function IntegrationsPanel({ nodes, onSelect }: { nodes: SystemNode[]; onSelect: (node: SystemNode) => void }) {
  return (
    <section className="panel rounded-sm p-4">
      <div className="font-mono text-xs uppercase text-cyan-200/80">Satellites around Hermes</div>
      <h2 className="text-lg font-semibold text-white">Integrations</h2>
      <div className="mt-4 grid gap-2">
        {nodes.map((node) => (
          <NodeCard key={node.id} node={node} compact onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
