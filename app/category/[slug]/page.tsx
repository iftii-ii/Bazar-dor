import { notFound } from "next/navigation";
import { getCategories, getProducts } from "@/lib/api";
import { bn } from "@/lib/format";
import ProductBrowser from "@/components/ProductBrowser";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug || c.id === slug);
  if (!category) notFound();

  const products = await getProducts(category.slug);

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 py-6">
      <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-muted">{bn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>
      <ProductBrowser products={products} />
    </div>
  );
}
