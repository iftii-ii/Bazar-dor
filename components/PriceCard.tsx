import Link from "next/link";
import type { Product } from "@/lib/api";
import { bn, changeOf, unitBn } from "@/lib/format";
import ChangeBadge from "@/components/ChangeBadge";

export default function PriceCard({ product }: { product: Product }) {
  const { dir, pct } = changeOf(product);
  return (
    <Link
      href={`/products/${product.id}`}
      className="block rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-brand/40"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-page text-2xl">{product.image}</span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold leading-tight">{product.nameBn}</h3>
          <p className="text-xs text-muted">প্রতি {unitBn(product.unit)}</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted">আজকের দাম</p>
      <div className="flex items-end justify-between">
        <p className="text-xl font-bold">
          {bn(product.today)} <span className="text-sm font-medium">টাকা</span>
        </p>
        <ChangeBadge dir={dir} pct={pct} />
      </div>
    </Link>
  );
}
