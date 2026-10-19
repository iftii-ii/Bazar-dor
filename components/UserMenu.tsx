"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/SignOutButton";

export default function UserMenu({ name, image }: { name: string; image?: string | null }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-page"
      >
        <Avatar name={name} image={image} size={34} />
        <span className="hidden text-sm font-medium sm:inline">{name.split(" ")[0]}</span>
        <span className="text-[9px] text-muted">▼</span>
      </button>
      {open && (
        <div role="menu" className="absolute right-0 z-30 mt-2 w-44 overflow-hidden rounded-xl border border-line bg-surface py-1 shadow-lg">
          <Link href="/profile" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm hover:bg-page">
            আমার প্রোফাইল
          </Link>
          <SignOutButton variant="menu" />
        </div>
      )}
    </div>
  );
}
