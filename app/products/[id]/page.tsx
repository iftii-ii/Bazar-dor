import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { bn, changeOf, taka, unitBn } from "@/lib/format";
import ChangeBadge from "@/components/ChangeBadge";

function Compare({ label, old, today }: { label: string; old: number; today: number }) {
  const diff = today - old;
  const text = diff === 0 ? "দাম অপরিবর্তিত" : `আজ ${bn(Math.abs(diff))} টাকা ${diff > 0 ? "বেশি" : "কম"}`;
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-xl font-bold">{taka(old)}</p>
      <p className={`mt-1 text-sm font-medium ${diff > 0 ? "text-up" : diff < 0 ? "text-down" : "text-muted"}`}>{text}</p>
    </div>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const { dir, pct } = changeOf(product);
  const byDivision = new Map<string, NonNullable<typeof product.markets>>();
  for (const m of product.markets ?? []) {
    byDivision.set(m.division, [...(byDivision.get(m.division) ?? []), m]);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <Link href={`/category/${product.category}`} className="text-sm text-muted hover:text-brand">
        ← {product.categoryNameBn}
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-page text-4xl">{product.image}</span>
          <div>
            <h1 className="text-2xl font-bold">{product.nameBn}</h1>
            <p className="text-sm text-muted">প্রতি {unitBn(product.unit)} · {product.categoryNameBn}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted">আজকের দাম</p>
          <p className="text-3xl font-bold">{taka(product.today)}</p>
          <ChangeBadge dir={dir} pct={pct} className="mt-1" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Compare label="গতকাল" old={product.yesterday} today={product.today} />
        <Compare label="গত সপ্তাহ" old={product.lastWeek} today={product.today} />
        <Compare label="গত মাস" old={product.lastMonth} today={product.today} />
      </div>

      {byDivision.size > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-bold">বাজারভিত্তিক দাম</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[...byDivision.entries()].map(([division, markets]) => (
              <div key={division} className="rounded-2xl border border-line bg-surface p-4">
                <h3 className="mb-2 font-semibold">{division}</h3>
                <ul className="divide-y divide-line text-sm">
                  {markets.map((m) => (
                    <li key={m.market} className="flex items-center justify-between py-2">
                      <span>{m.market}</span>
                      <span className="font-medium">
                        {bn(m.min)} – {bn(m.max)} টাকা
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
