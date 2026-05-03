import type { Status } from "@/lib/mission-control-data";

const styles: Record<Status | "paused", string> = {
  operational: "border-cyan-300/50 bg-cyan-300/12 text-cyan-100",
  active: "border-blue-300/45 bg-blue-300/12 text-blue-100",
  idle: "border-white/20 bg-white/8 text-slate-200",
  needs_attention: "border-amber-300/50 bg-amber-300/12 text-amber-100",
  paused: "border-slate-300/30 bg-slate-300/10 text-slate-200",
};

export function StatusPill({ status }: { status: Status | "paused" }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-sm border px-2 py-1 text-[11px] font-semibold uppercase leading-none ${styles[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_10px_currentColor]" />
      {status.replace("_", " ")}
    </span>
  );
}
