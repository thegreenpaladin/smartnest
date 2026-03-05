"use client";

import { useCart } from "@/context/cart-context";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Product } from "@/lib/types";

export const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });

    toast.success(`${product.name} added to cart!`, {
      action: {
        label: "View Cart",
        onClick: () => {
          const cartTrigger = document.querySelector('[aria-haspopup="dialog"]');
          if (cartTrigger instanceof HTMLElement) cartTrigger.click();
        },
      },
    });
  };

  const hasDiscount = !!product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col border border-neutral-300 bg-white">
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 border-b border-neutral-300">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="absolute left-3 top-3 flex gap-2">
          <span className="bg-white/95 border border-neutral-300 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide">
            {product.category}
          </span>
          {hasDiscount ? (
            <span className="bg-red-600 text-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide">
              -{discountPercent}%
            </span>
          ) : null}
        </div>

        <button
          onClick={handleAdd}
          className="absolute bottom-3 right-3 z-20 flex h-10 w-10 items-center justify-center border border-neutral-900 bg-white text-black opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="px-4 py-4 space-y-2">
        <h3 className="text-sm font-semibold text-neutral-900 min-h-10">{product.name}</h3>
        <div className="flex items-center gap-2">
          <p className="text-base font-extrabold text-neutral-900">${product.price}</p>
          {hasDiscount ? (
            <p className="text-xs text-neutral-500 line-through">${product.compareAtPrice}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
