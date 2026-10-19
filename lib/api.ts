const BASE = "https://openapi.programming-hero.com/api/bazardor";

export type Category = { id: string; slug: string; nameBn: string; icon: string };
export type Market = { market: string; division: string; min: number; max: number };
export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  markets?: Market[];
};

async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE}${path}`, { next: { revalidate: 600 } });
    if (!res.ok) return null;
    const json = await res.json();
    if (json && !Array.isArray(json) && typeof json === "object" && "data" in json && !("id" in json)) {
      return json.data as T;
    }
    return json as T;
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  const data = await get<Category[]>("/categories");
  return Array.isArray(data) ? data : [];
}

export async function getProducts(category?: string): Promise<Product[]> {
  const data = await get<Product[]>(category ? `/products?category=${encodeURIComponent(category)}` : "/products");
  return Array.isArray(data) ? data : [];
}

export async function getProduct(id: string): Promise<Product | null> {
  const data = await get<Product>(`/products/${encodeURIComponent(id)}`);
  return data && typeof data === "object" && "nameBn" in data ? data : null;
}
