export function FlowLegend() {
  const lines = [
    ["Control flow", "border-cyan-300"],
    ["Data / memory", "border-blue-400 border-dashed"],
    ["Execution / output", "border-white/60"],
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
      {lines.map(([label, border]) => (
        <div key={label} className="flex items-center gap-2">
          <span className={`block w-8 border-t ${border}`} />
          {label}
        </div>
      ))}
    </div>
  );
}
