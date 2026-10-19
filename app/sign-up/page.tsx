import { redirect } from "next/navigation";
import { enabledProviders } from "@/lib/auth";
import { getSession } from "@/lib/session";
import AuthShell from "@/components/AuthShell";
import SignUpForm from "@/components/SignUpForm";

export const metadata = { title: "অ্যাকাউন্ট তৈরি করুন — বাজার দর" };

export default async function SignUpPage() {
  if (await getSession()) redirect("/");
  return (
    <AuthShell title="অ্যাকাউন্ট তৈরি করুন" subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।">
      <SignUpForm providers={enabledProviders} />
    </AuthShell>
  );
}
