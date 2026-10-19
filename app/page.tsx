import Link from "next/link";
import { getProducts } from "@/lib/api";
import { changeOf, todayBn } from "@/lib/format";
import PriceCard from "@/components/PriceCard";
import ProductBrowser from "@/components/ProductBrowser";

function Basket() {
  return (
    <svg viewBox="0 0 220 170" className="h-40 w-52" aria-hidden>
      <ellipse cx="110" cy="152" rx="90" ry="9" fill="#e4e9e2" />
      <circle cx="75" cy="68" r="19" fill="#a855f7" />
      <circle cx="105" cy="55" r="27" fill="#ef4444" />
      <circle cx="148" cy="52" r="29" fill="#22c55e" />
      <circle cx="128" cy="72" r="15" fill="#f97316" />
      <circle cx="170" cy="72" r="14" fill="#f97316" />
      <path d="M55 82h110l-12 66H67z" fill="#b45309" />
      <rect x="50" y="76" width="120" height="12" rx="3" fill="#92400e" />
      <path d="M85 90l4 56M110 90v56M135 90l-4 56" stroke="#78350f" strokeWidth="3" />
    </svg>
  );
}

export default async function HomePage() {
  const products = await getProducts();
  const withChange = products.map((p) => ({ p, ...changeOf(p) }));
  const rises = withChange.filter((x) => x.dir === "up").sort((a, b) => b.pct - a.pct).slice(0, 6);
  const falls = withChange.filter((x) => x.dir === "down").sort((a, b) => b.pct - a.pct).slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-6">
      <section className="flex items-center justify-between gap-6 rounded-3xl border border-line bg-surface p-6 sm:p-8">
        <div className="max-w-xl">
          <span className="inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-brand">{todayBn()}</span>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
          <p className="mt-3 text-muted">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#all-products"
            className="mt-5 inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/30 hover:bg-brand-dark"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="hidden shrink-0 md:block">
          <Basket />
        </div>
      </section>

      {!products.length && (
        <p className="rounded-2xl border border-dashed border-line py-12 text-center text-muted">
          এই মুহূর্তে দাম লোড করা যাচ্ছে না। কিছুক্ষণ পরে পেজ রিফ্রেশ করুন।
        </p>
      )}

      {rises.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <span className="text-sm text-up">▲</span> আজ দাম বেড়েছে
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rises.map(({ p }) => (
              <PriceCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {falls.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <span className="text-sm text-down">▼</span> আজ দাম কমেছে
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {falls.map(({ p }) => (
              <PriceCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {products.length > 0 && (
        <section id="all-products" className="scroll-mt-4">
          <h2 className="mb-4 text-xl font-bold">সব পণ্য</h2>
          <ProductBrowser products={products} showSearch />
        </section>
      )}
    </div>
  );
}
