"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { authClient, authErrorBn } from "@/lib/auth-client";
import { inputClass, primaryBtn } from "@/components/AuthShell";

export default function ProfileForm({ name }: { name: string }) {
  const router = useRouter();
  const [value, setValue] = useState(name);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) return setMsg({ ok: false, text: "নাম খালি রাখা যাবে না।" });
    setLoading(true);
    setMsg(null);
    const { error } = await authClient.updateUser({ name: value.trim() });
    setLoading(false);
    if (error) return setMsg({ ok: false, text: authErrorBn(error) });
    setMsg({ ok: true, text: "প্রোফাইল আপডেট হয়েছে।" });
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block text-sm font-medium">
        নাম
        <input value={value} onChange={(e) => setValue(e.target.value)} required className={inputClass} />
      </label>
      {msg && (
        <p role="status" className={`text-sm ${msg.ok ? "text-brand" : "text-up"}`}>{msg.text}</p>
      )}
      <button type="submit" disabled={loading || value.trim() === name} className={primaryBtn}>
        {loading ? "আপডেট হচ্ছে…" : "আপডেট"}
      </button>
    </form>
  );
}
