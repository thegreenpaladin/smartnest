// components/home/featured-grid.tsx
import { PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/shared/product-card";

export const FeaturedGrid = () => {
  // We take the first 4 products to keep the "Teaser" look
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-2">
          <h2 className="text-3xl font-serif">Featured Objects</h2>
          <p className="text-neutral-500 text-sm">Curated essentials for the modern home.</p>
        </div>
        <a 
          href="/shop" 
          className="text-sm font-medium underline underline-offset-8 hover:text-neutral-500 transition-colors"
        >
          View All
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};