"use client";

import { motion } from "framer-motion";
import { User, Menu, Shield } from "lucide-react";
import Link from "next/link";
import { CartDrawer } from "./cart-drawer";
import { SearchOverlay } from "./search-overlay";
import { useSession } from "next-auth/react";

export const Navbar = () => {
  const { data: session } = useSession();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 w-full z-50 px-6 py-4"
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between bg-white/80 backdrop-blur-md border border-neutral-200 px-6 py-3 rounded-full shadow-sm">
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
          <SearchOverlay />
          <CartDrawer />
          <Link href={session ? "/account" : "/account/sign-in"} className="hidden md:block text-neutral-700 hover:text-black">
            <User size={20} />
          </Link>
          {session?.user?.role === "ADMIN" ? (
            <Link href="/admin" className="hidden md:block text-neutral-700 hover:text-black">
              <Shield size={18} />
            </Link>
          ) : null}
          <Menu className="md:hidden" size={20} />
        </div>
      </nav>
    </motion.header>
  );
};
