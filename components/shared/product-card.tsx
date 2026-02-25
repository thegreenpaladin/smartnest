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

  return (
    <div className="group relative flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <button
          onClick={handleAdd}
          className="absolute bottom-4 right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-xl 
                     transition-all duration-300 
                     opacity-0 translate-y-4 
                     group-hover:opacity-100 group-hover:translate-y-0 
                     active:scale-95"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="mt-4 px-1">
        <h3 className="text-sm font-medium text-neutral-900">{product.name}</h3>
        <p className="text-sm text-neutral-500">${product.price}</p>
      </div>
    </div>
  );
};
