// components/shared/product-skeleton.tsx
export const ProductSkeleton = () => {
  return (
    <div className="flex flex-col space-y-4">
      {/* Image box */}
      <div className="relative aspect-[4/5] w-full animate-pulse rounded-2xl bg-neutral-200" />
      {/* Text lines */}
      <div className="space-y-2">
        <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-200" />
        <div className="h-4 w-1/4 animate-pulse rounded bg-neutral-200" />
      </div>
    </div>
  );
};

export const ArchiveSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
};