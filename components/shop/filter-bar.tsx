"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const CATEGORIES = ["all", "lighting", "portable-power", "personal-climate", "utility"];

export const FilterBar = ({ activeCategory }: { activeCategory: string }) => {
  const router = useRouter();

  const handleFilter = (category: string) => {
    const params = new URLSearchParams(window.location.search);

    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    const query = params.toString() ? `?${params.toString()}` : "";
    router.push(`/shop${query}`);
  };

  return (
    <div className="flex flex-wrap gap-3 border-b border-neutral-200 pb-5">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => handleFilter(cat)}
          className={cn(
            "px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all border",
            activeCategory === cat
              ? "bg-black text-white border-black"
              : "bg-white text-neutral-600 border-neutral-300 hover:border-black hover:text-black",
          )}
        >
          {cat.replace(/-/g, " ")}
        </button>
      ))}
    </div>
  );
};
