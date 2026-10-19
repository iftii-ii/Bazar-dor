"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton({ variant = "outline" }: { variant?: "outline" | "menu" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function signOut() {
    setLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
        onError: () => setLoading(false),
      },
    });
  }

  if (variant === "menu") {
    return (
      <button onClick={signOut} disabled={loading} className="block w-full px-4 py-2 text-left text-sm text-up hover:bg-page">
        {loading ? "সাইন আউট হচ্ছে…" : "সাইন আউট"}
      </button>
    );
  }
  return (
    <button
      onClick={signOut}
      disabled={loading}
      className="rounded-lg border border-up px-4 py-2 text-sm font-medium text-up transition-colors hover:bg-red-50 disabled:opacity-60"
    >
      ↩ {loading ? "অপেক্ষা করুন…" : "সাইন আউট"}
    </button>
  );
}
