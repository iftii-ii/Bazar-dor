import { redirect } from "next/navigation";
import { enabledProviders } from "@/lib/auth";
import { getSession } from "@/lib/session";
import AuthShell from "@/components/AuthShell";
import SignInForm from "@/components/SignInForm";

export const metadata = { title: "সাইন ইন — বাজার দর" };

export default async function SignInPage() {
  if (await getSession()) redirect("/");
  return (
    <AuthShell title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।">
      <SignInForm providers={enabledProviders} />
    </AuthShell>
  );
}
