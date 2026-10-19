"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/api";

export default function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  return (
    <nav className="border-b border-line" aria-label="ক্যাটাগরি">
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2.5">
        {categories.map((c) => {
          const active = pathname === `/category/${c.slug}`;
          return (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              aria-current={active ? "page" : undefined}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                active ? "bg-brand text-white" : "hover:bg-page"
              }`}
            >
              <span>{c.icon}</span>
              {c.nameBn}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
