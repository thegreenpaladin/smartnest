import { ProductCard } from "@/components/shared/product-card";
import { getProductsByCategory } from "@/lib/catalog";
import Link from "next/link";

interface ProductShelfProps {
  title: string;
  category?: string;
  limit?: number;
}

export const ProductShelf = ({ title, category, limit = 4 }: ProductShelfProps) => {
  const filteredProducts = getProductsByCategory(category).slice(0, limit);

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-7">
          <h2 className="text-3xl font-serif text-neutral-900">{title}</h2>
          <Link href={`/shop?category=${category || "all"}`} className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1">
            See More
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
