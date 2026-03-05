import { ProductCard } from "@/components/shared/product-card";
import { getProductsByCategory } from "@/lib/catalog";

interface ProductArchiveProps {
  category?: string;
}

export const ProductArchive = async ({ category = "all" }: ProductArchiveProps) => {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const filtered = getProductsByCategory(category);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-sm text-neutral-500 font-medium">
        <p>Showing {filtered.length} products</p>
        <div className="flex gap-4">
          <span className="text-black underline cursor-pointer">Grid</span>
          <span className="hover:text-black cursor-pointer">List</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
