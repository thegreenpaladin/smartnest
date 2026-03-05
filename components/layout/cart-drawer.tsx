"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/context/cart-context";
import { ShoppingBag, Plus, Minus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const CartDrawer = () => {
  const { state, removeItem, updateQuantity } = useCart();
  const { items } = state;
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger className="relative p-2 hover:bg-neutral-100 rounded-full transition-colors group">
        <ShoppingBag size={20} className="group-hover:scale-105 transition-transform" />
        {items.length > 0 && (
          <span className="absolute top-0 right-0 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {items.length}
          </span>
        )}
      </SheetTrigger>
      
      {/* Remove default border and add custom shadow */}
      <SheetContent className="w-full sm:max-w-md flex flex-col border-l border-neutral-100 p-0 shadow-2xl">
        <div className="p-6 border-b border-neutral-100">
          <SheetHeader>
            <SheetTitle className="font-serif text-2xl font-normal">Your Bag</SheetTitle>
          </SheetHeader>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-8 scrollbar-hide">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 opacity-40">
              <ShoppingBag size={40} strokeWidth={1} />
              <p className="font-serif italic text-lg text-neutral-500">Your bag is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-6 items-start group">
                {/* Image Wrapper */}
                <div className="relative h-32 w-24 bg-[#F5F5F5] rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col h-32 justify-between py-1">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm leading-tight max-w-[140px]">{item.name}</h4>
                      <button 
                        onClick={() => removeItem(item.id)} 
                        className="text-neutral-300 hover:text-black transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-neutral-900">${item.price}</p>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    {/* Quantity Control */}
                    <div className="flex items-center gap-4 border border-neutral-200 rounded-full px-3 py-1.5 h-9">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="text-neutral-400 hover:text-black"
                      >
                        <Minus size={12}/>
                      </button>
                      <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-neutral-400 hover:text-black"
                      >
                        <Plus size={12}/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer section with clear separator */}
        {items.length > 0 && (
          <div className="bg-white border-t border-neutral-100 p-6 space-y-6">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center font-medium text-lg">
                <span className="text-neutral-500 text-sm uppercase tracking-widest">Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <p className="text-[11px] text-neutral-400 uppercase tracking-tighter">
                Shipping & taxes calculated at checkout
              </p>
            </div>
            
            <Link href="/checkout" className="block w-full text-center bg-black text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-neutral-800 transition-all active:scale-[0.98]">
              Proceed to Checkout
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};