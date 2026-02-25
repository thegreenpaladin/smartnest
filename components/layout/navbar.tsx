// components/layout/navbar.tsx
"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Search, User, Menu } from "lucide-react";
import Link from "next/link";
import { CartDrawer } from "./cart-drawer";
import { SearchOverlay } from "./search-overlay";

export const Navbar = () => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 w-full z-50 px-6 py-4"
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between bg-white/70 backdrop-blur-md border border-neutral-200 px-6 py-3 rounded-full shadow-sm">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tighter uppercase">
            Smart<span className="text-neutral-400">Nest</span>
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-medium text-neutral-600">
            <Link href="/shop" className="hover:text-black transition-colors">Shop All</Link>
            <Link href="/collections" className="hover:text-black transition-colors">Collections</Link>
            <Link href="/about" className="hover:text-black transition-colors">Journal</Link>
          </div>
        </div>

        <div className="flex items-center gap-5">
          {/* <button className="p-1 hover:bg-neutral-100 rounded-full transition-colors">
            <Search size={20} />
          </button> */}
          <SearchOverlay />
          {/* <button className="p-1 hover:bg-neutral-100 rounded-full transition-colors relative"> */}
            {/* <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span> */}
          {/* </button> */}
          <CartDrawer />
          <Link href="/login" className="hidden md:block">
            <User size={20} />
          </Link>
          <Menu className="md:hidden" size={20} />
        </div>
      </nav>
    </motion.header>
  );
};