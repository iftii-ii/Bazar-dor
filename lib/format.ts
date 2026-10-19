import type { Product } from "@/lib/api";

const nf = new Intl.NumberFormat("bn-BD");
const pf = new Intl.NumberFormat("bn-BD", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export const bn = (n: number) => nf.format(n);
export const bnPct = (n: number) => pf.format(n);
export const taka = (n: number) => `${bn(n)} টাকা`;

const UNITS: Record<string, string> = {
  kg: "কেজি",
  l: "লিটার",
  ltr: "লিটার",
  liter: "লিটার",
  litre: "লিটার",
  dozen: "ডজন",
  doz: "ডজন",
  dz: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  pc: "পিস",
  pis: "পিস",
};
export const unitBn = (u: string) => UNITS[u.toLowerCase()] ?? u;

export type Dir = "up" | "down" | "flat";
export function changeOf(p: Pick<Product, "today" | "yesterday">): { dir: Dir; pct: number } {
  const diff = p.today - p.yesterday;
  const pct = p.yesterday ? Math.round((Math.abs(diff) / p.yesterday) * 1000) / 10 : 0;
  if (pct === 0) return { dir: "flat", pct: 0 };
  return { dir: diff > 0 ? "up" : "down", pct };
}

export function todayBn() {
  return new Date().toLocaleDateString("bn-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
