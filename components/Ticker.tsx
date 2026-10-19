import type { Product } from "@/lib/api";
import { bn, bnPct, changeOf, unitBn } from "@/lib/format";

export default function Ticker({ products }: { products: Product[] }) {
  if (!products.length) return null;
  const items = [...products, ...products];
  return (
    <div className="marquee overflow-hidden border-b border-line bg-surface" aria-label="আজকের দামের তালিকা">
      <div className="marquee-track">
        {items.map((p, i) => {
          const { dir, pct } = changeOf(p);
          return (
            <div
              key={`${p.id}-${i}`}
              aria-hidden={i >= products.length}
              className="flex shrink-0 items-center gap-2 border-r border-line px-4 py-2 text-sm"
            >
              <span>{p.image}</span>
              <span className="font-medium">{p.nameBn}</span>
              <span className="text-muted">
                {bn(p.today)} টাকা/{unitBn(p.unit)}
              </span>
              <span className={`font-bold ${dir === "up" ? "text-up" : dir === "down" ? "text-down" : "text-muted"}`}>
                {dir === "up" ? "▲" : dir === "down" ? "▼" : "—"} {bnPct(pct)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
