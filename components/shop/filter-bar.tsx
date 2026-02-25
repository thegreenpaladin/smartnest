// components/shop/filter-bar.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const CATEGORIES = ["all", "furniture", "decor", "textiles", "lighting"];

export const FilterBar = ({ activeCategory }: { activeCategory: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (category: string) => {
    const params = new URLSearchParams(window.location.search); // Use window for fresh params
    
    if (category === "all") {
        params.delete("category");
    } else {
        params.set("category", category);
    }

    // Construct the new URL
    const query = params.toString() ? `?${params.toString()}` : "";
    router.push(`/shop${query}`);
  };

  return (
    <div className="flex flex-wrap gap-4 border-b border-neutral-200 pb-6">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => handleFilter(cat)}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-medium transition-all capitalize border",
            activeCategory === cat
              ? "bg-black text-white border-black"
              : "bg-transparent text-neutral-500 border-neutral-200 hover:border-black hover:text-black"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
