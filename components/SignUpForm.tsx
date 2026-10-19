"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { authClient, authErrorBn } from "@/lib/auth-client";
import { Divider, inputClass, primaryBtn } from "@/components/AuthShell";
import SocialButtons from "@/components/SocialButtons";

export default function SignUpForm({ providers }: { providers: { google: boolean; github: boolean } }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password"));
    if (password.length < 8) return setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
    if (password !== String(fd.get("confirm"))) return setError("দুটি পাসওয়ার্ড মিলছে না।");

    setLoading(true);
    setError(null);
    const { error } = await authClient.signUp.email({
      name: String(fd.get("name")).trim(),
      email: String(fd.get("email")),
      password,
    });
    setLoading(false);
    if (error) return setError(authErrorBn(error));
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block text-sm font-medium">
          নাম
          <input name="name" required autoComplete="name" placeholder="যেমন: রহিম উদ্দিন" className={inputClass} />
        </label>
        <label className="block text-sm font-medium">
          ইমেইল
          <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputClass} />
        </label>
        <label className="block text-sm font-medium">
          পাসওয়ার্ড
          <input name="password" type="password" required minLength={8} autoComplete="new-password" placeholder="কমপক্ষে ৮ অক্ষর" className={inputClass} />
        </label>
        <label className="block text-sm font-medium">
          পাসওয়ার্ড নিশ্চিত করুন
          <input name="confirm" type="password" required minLength={8} autoComplete="new-password" placeholder="আবার লিখুন" className={inputClass} />
        </label>
        {error && <p role="alert" className="text-sm text-up">{error}</p>}
        <button type="submit" disabled={loading} className={primaryBtn}>
          {loading ? "অপেক্ষা করুন…" : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>
      <Divider />
      <SocialButtons providers={providers} />
      <p className="mt-4 text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/sign-in" className="text-brand hover:underline">সাইন ইন করুন</Link>
      </p>
    </>
  );
}
