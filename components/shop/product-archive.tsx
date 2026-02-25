// components/shop/product-archive.tsx
import { PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/shared/product-card";

interface ProductArchiveProps {
  category?: string;
}

export const ProductArchive = async ({ category = "all" }: ProductArchiveProps) => {
  // In a real app, this would be a database call: 
  // const products = await db.product.findMany({ where: { category } })
  console.log("category:", category);
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

  const allProducts = PRODUCTS;

  const filtered = category === "all" 
    ? allProducts 
    : allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center text-sm text-neutral-500 font-medium">
        <p>Showing {filtered.length} products</p>
        <div className="flex gap-4">
          <span className="text-black underline cursor-pointer">Grid</span>
          <span className="hover:text-black cursor-pointer">List</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-40 text-center">
          <h3 className="text-2xl font-serif">No objects found.</h3>
          <p className="text-neutral-500 mt-2">Try adjusting your filters or browsing all items.</p>
        </div>
      )}
    </div>
  );
};
