// components/product/product-details.tsx
"use client";

import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { ProductSpecs } from "./product-specs";
import { ProductTabs } from "./product-tabs";

export const ProductDetails = ({ product }: { product: any }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedSize}`, // Unique ID per size
      name: `${product.name} (${selectedSize})`,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });

    toast.success("Added to bag", {
      description: `${product.name} in ${selectedSize} is waiting for you.`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
      {/* Image Gallery */}
      <div className="relative aspect-4/5 rounded-3xl overflow-hidden bg-neutral-100">
        <Image 
          src={product.images[0]} 
          alt={product.name} 
          fill 
          className="object-cover" 
          priority
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-center space-y-10">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">
            {product.category}
          </p>
          <h1 className="text-5xl font-serif text-neutral-900">{product.name}</h1>
          <p className="text-2xl font-light">${product.price}</p>
        </div>

        {/* <p className="text-neutral-600 leading-relaxed max-w-md">
          {product.description}
        </p> */}
        
        <ProductTabs product={product} />

        {/* Size Selector */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium uppercase tracking-widest">Select Size</h3>
            <button className="text-xs text-neutral-400 underline underline-offset-4">Size Guide</button>
          </div>
          <div className="flex flex-wrap gap-3">
            {product.sizes?.map((size: string) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "px-8 py-3 rounded-full text-xs font-medium border transition-all",
                  selectedSize === size
                    ? "border-black bg-black text-white"
                    : "border-neutral-200 text-neutral-500 hover:border-black hover:text-black"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-neutral-800 transition-all active:scale-[0.98] shadow-xl shadow-neutral-200"
        >
          Add to Bag — ${product.price}
        </button>

        {/* New Specs Component */}
        {/* <ProductSpecs specs={product.specs} /> */}


        {/* Minimalist Trust Badges */}
        <div className="pt-6 grid grid-cols-2 gap-4 border-t border-neutral-100">
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Free Global Shipping</p>
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest">30-Day Returns</p>
        </div>
      </div>
    </div>
  );
};
