import { bnPct, type Dir } from "@/lib/format";

export default function ChangeBadge({ dir, pct, className = "" }: { dir: Dir; pct: number; className?: string }) {
  const style =
    dir === "up"
      ? "bg-red-50 text-up"
      : dir === "down"
        ? "bg-green-50 text-down"
        : "bg-neutral-100 text-muted";
  const icon = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${style} ${className}`}>
      <span className="text-[10px]">{icon}</span>
      {bnPct(pct)}%
    </span>
  );
}
