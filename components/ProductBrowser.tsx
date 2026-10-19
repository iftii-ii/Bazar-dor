"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/api";
import { bn, changeOf } from "@/lib/format";
import PriceCard from "@/components/PriceCard";

type Sort = "default" | "price-asc" | "price-desc" | "rise" | "fall";

const signed = (p: Product) => {
  const c = changeOf(p);
  return c.dir === "up" ? c.pct : c.dir === "down" ? -c.pct : 0;
};

export default function ProductBrowser({ products, showSearch = false }: { products: Product[]; showSearch?: boolean }) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("default");

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const filtered = term
      ? products.filter((p) => p.nameBn.toLowerCase().includes(term) || p.categoryNameBn.toLowerCase().includes(term))
      : [...products];
    switch (sort) {
      case "price-asc": return filtered.sort((a, b) => a.today - b.today);
      case "price-desc": return filtered.sort((a, b) => b.today - a.today);
      case "rise": return filtered.sort((a, b) => signed(b) - signed(a));
      case "fall": return filtered.sort((a, b) => signed(a) - signed(b));
      default: return filtered;
    }
  }, [products, q, sort]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-3.5">
        {showSearch ? (
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="পণ্য খুঁজুন… যেমন: পেঁয়াজ"
            aria-label="পণ্য খুঁজুন"
            className="h-10 min-w-0 flex-1 rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand sm:max-w-xs"
          />
        ) : (
          <span />
        )}
        <label className="flex items-center gap-2 text-sm text-muted">
          সাজান
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-10 rounded-lg border border-line bg-white px-3 text-sm text-ink outline-none focus:border-brand"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
            <option value="rise">সবচেয়ে বেশি বেড়েছে</option>
            <option value="fall">সবচেয়ে বেশি কমেছে</option>
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-muted">মোট {bn(list.length)}টি পণ্য দেখানো হচ্ছে</p>

      {list.length ? (
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <PriceCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-2xl border border-dashed border-line py-12 text-center text-muted">
          “{q}” নামে কোনো পণ্য পাওয়া যায়নি। অন্য নাম লিখে খুঁজুন।
        </p>
      )}
    </div>
  );
}
