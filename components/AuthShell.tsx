import Link from "next/link";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-center text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-center text-sm text-muted">{subtitle}</p>
      <div className="mt-6 rounded-2xl border border-line bg-surface p-6">{children}</div>
      <p className="mt-6 text-center text-sm text-muted">
        <Link href="/" className="hover:text-brand">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
}

export const inputClass =
  "mt-1.5 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none transition-colors focus:border-brand";
export const primaryBtn =
  "h-10 w-full rounded-lg bg-brand text-sm font-semibold text-white shadow-md shadow-brand/30 transition-colors hover:bg-brand-dark disabled:opacity-60";

export function Divider() {
  return (
    <div className="my-4 flex items-center gap-3 text-xs text-muted">
      <span className="h-px flex-1 bg-line" /> অথবা <span className="h-px flex-1 bg-line" />
    </div>
  );
}
