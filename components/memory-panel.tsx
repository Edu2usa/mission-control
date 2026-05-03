"use client";

import type { SystemNode } from "@/lib/mission-control-data";
import { SystemNode as NodeCard } from "./system-node";

export function MemoryPanel({ nodes, onSelect }: { nodes: SystemNode[]; onSelect: (node: SystemNode) => void }) {
  return (
    <section className="panel rounded-sm p-4">
      <div className="font-mono text-xs uppercase text-cyan-200/80">Bidirectional context</div>
      <h2 className="text-lg font-semibold text-white">Memory + Data</h2>
      <p className="mt-2 text-sm text-slate-300">Hermes reads and writes structured data, markdown knowledge, local memory files, and session history.</p>
      <div className="mt-4 grid gap-2">
        {nodes.map((node) => (
          <NodeCard key={node.id} node={node} compact onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
