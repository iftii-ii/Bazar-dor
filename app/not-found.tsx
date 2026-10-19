import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center">
      <p className="text-5xl">🧺</p>
      <h1 className="mt-4 text-2xl font-bold">পাতাটি খুঁজে পাওয়া যায়নি</h1>
      <p className="mt-2 text-muted">আপনি যে পণ্য বা ক্যাটাগরি খুঁজছেন তা নেই।</p>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
