// app/search/page.tsx
import { PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/shared/product-card";

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ q?: string }> 
}) {
  const { q } = await searchParams;
  const query = q?.toLowerCase() || "";

  const results = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.category.toLowerCase().includes(query)
  );

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <h1 className="text-4xl font-serif mb-8">
        {query ? `Results for "${query}"` : "Search our Archive"}
      </h1>
      
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-neutral-500">No objects found matching your request.</div>
      )}
    </div>
  );
}
