import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Avatar from "@/components/Avatar";
import ProfileForm from "@/components/ProfileForm";
import SignOutButton from "@/components/SignOutButton";

export const metadata = { title: "আমার প্রোফাইল — বাজার দর" };

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  const { user } = session;

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-muted">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-6">
        <div className="flex items-center gap-4">
          <Avatar name={user.name} image={user.image} size={80} />
          <div>
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-muted">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </div>

      <div className="rounded-2xl border border-line bg-surface p-6">
        <h2 className="mb-4 font-semibold">তথ্য</h2>
        <ProfileForm name={user.name} />
      </div>
    </div>
  );
}
