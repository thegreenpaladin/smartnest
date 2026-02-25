// app/shop/page.tsx
import { Suspense } from "react";
import { ProductArchive } from "@/components/shop/product-archive";
import { ArchiveSkeleton } from "@/components/shared/product-skeleton";
import { FilterBar } from "@/components/shop/filter-bar";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedParams = await searchParams
  const currentCategory = resolvedParams.category || "all";

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <header className="mb-12 space-y-4">
        <h1 className="text-5xl font-serif text-neutral-900">Archive</h1>
        {/* <p className="text-neutral-500 max-w-md">
          Explore our full range of essential objects, filtered by purpose and aesthetic.
        </p> */}
        <Suspense fallback={<div className="h-10 w-full bg-neutral-100 animate-pulse rounded-full" />}>
            <FilterBar activeCategory={currentCategory} />
        </Suspense>
      </header>

      {/* Filter Component */}

      {/* Grid Component - We'll pass the category to it later */}
      <Suspense key={currentCategory} fallback={<ArchiveSkeleton />}>
        <ProductArchive category={currentCategory} />
      </Suspense>
      
    </div>
  );
}
