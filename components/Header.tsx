import Link from "next/link";
import { getCategories, getProducts } from "@/lib/api";
import { getSession } from "@/lib/session";
import { todayBn } from "@/lib/format";
import CategoryNav from "@/components/CategoryNav";
import Ticker from "@/components/Ticker";
import UserMenu from "@/components/UserMenu";

export default async function Header() {
  const [session, categories, products] = await Promise.all([getSession(), getCategories(), getProducts()]);

  return (
    <header className="bg-surface">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-xl">🛒</span>
          <span className="leading-tight">
            <span className="block text-lg font-bold">বাজার দর</span>
            <span className="block text-[11px] text-muted">{todayBn()}</span>
          </span>
        </Link>

        {session ? (
          <UserMenu name={session.user.name} image={session.user.image} />
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/sign-in" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-page">
              সাইন ইন
            </Link>
            <Link
              href="/sign-up"
              className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand/30 hover:bg-brand-dark"
            >
              সাইন আপ
            </Link>
          </div>
        )}
      </div>
      <CategoryNav categories={categories} />
      <Ticker products={products} />
    </header>
  );
}
