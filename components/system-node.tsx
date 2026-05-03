import {
  Blocks,
  BookOpen,
  Brain,
  Cpu,
  Database,
  Files,
  History,
  LucideIcon,
  MessageCircle,
  MessagesSquare,
  Monitor,
  Network,
  Rocket,
  Route,
  Server,
  User,
} from "lucide-react";
import type { SystemNode as SystemNodeType } from "@/lib/mission-control-data";
import { StatusPill } from "./status-pill";

const icons: Record<string, LucideIcon> = {
  blocks: Blocks,
  "book-open": BookOpen,
  brain: Brain,
  cpu: Cpu,
  database: Database,
  files: Files,
  history: History,
  "message-circle": MessageCircle,
  "messages-square": MessagesSquare,
  monitor: Monitor,
  network: Network,
  rocket: Rocket,
  route: Route,
  server: Server,
  user: User,
};

export function SystemNode({ node, compact = false, onSelect }: { node: SystemNodeType; compact?: boolean; onSelect?: (node: SystemNodeType) => void }) {
  const Icon = icons[node.icon] ?? Network;

  return (
    <button
      type="button"
      onClick={() => onSelect?.(node)}
      className={`blueprint-card w-full rounded-sm p-3 text-left transition hover:border-cyan-200/60 hover:bg-cyan-300/10 ${compact ? "min-h-24" : "min-h-32"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center border border-cyan-200/30 bg-cyan-300/10 text-cyan-100">
            <Icon size={16} />
          </span>
          <div>
            <div className="text-sm font-semibold text-white">{node.name}</div>
            <div className="font-mono text-[10px] uppercase text-cyan-200/70">{node.layer}</div>
          </div>
        </div>
        {!compact && <StatusPill status={node.status} />}
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-300">{node.description}</p>
      {!compact && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {node.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="border border-white/10 px-1.5 py-1 font-mono text-[10px] text-cyan-100/80">
              {tag}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
