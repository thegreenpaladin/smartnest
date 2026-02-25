// components/home/product-shelf.tsx
import { PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/shared/product-card";
import Link from "next/link";

interface ProductShelfProps {
  title: string;
  category?: string;
  limit?: number;
}

export const ProductShelf = ({ title, category, limit = 4 }: ProductShelfProps) => {
  // Filter by category or just take top products
  const filteredProducts = category 
    ? PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase()).slice(0, limit)
    : PRODUCTS.slice(0, limit);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-serif text-neutral-900">{title}</h2>
          <Link href={`/shop?category=${category || "all"}`} className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1">
            See More
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};