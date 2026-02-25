"use client";

import * as React from "react";
import { Search, Package, ArrowRight } from "lucide-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";

export function SearchOverlay() {
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data: { products?: Product[] }) => setProducts(data.products ?? []))
      .catch(() => setProducts([]));
  }, []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <button onClick={() => setOpen(true)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors group">
        <Search size={20} className="group-hover:scale-110 transition-transform" />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search archive..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = e.currentTarget.value;
              if (value) runCommand(() => router.push(`/search?q=${value}`));
            }
          }}
        />
        <CommandList className="max-h-[300px] sm:max-h-[450px]">
          <CommandEmpty>No results found for this search.</CommandEmpty>
          <CommandGroup heading="Products">
            {products.map((product) => (
              <CommandItem
                key={product.id}
                value={product.name}
                onSelect={() => runCommand(() => router.push(`/product/${product.slug}`))}
                className="flex items-center justify-between py-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <Package className="h-4 w-4 text-neutral-400 group-aria-selected:text-black transition-colors" />
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400">{product.category}</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-aria-selected:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 group-aria-selected:translate-x-0" />
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Quick Links">
            <CommandItem onSelect={() => runCommand(() => router.push("/shop"))}>View All Archive</CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/about"))}>Our Story</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
