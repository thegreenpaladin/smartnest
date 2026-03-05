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
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 w-full z-50 border-b border-[#d5e2f2] bg-white/95 backdrop-blur-md"
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-[#133d67]">
            Smart<span className="text-[#2b76b8]">Nest</span>
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-semibold text-[#3b5f85]">
            <Link href="/shop" className="hover:text-[#133d67] transition-colors">Shop All</Link>
            <Link href="/collections" className="hover:text-[#133d67] transition-colors">Collections</Link>
            <Link href="/about" className="hover:text-[#133d67] transition-colors">About</Link>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <SearchOverlay />
          <CartDrawer />
          <Link href={session ? "/account" : "/account/sign-in"} className="hidden md:block text-[#3b5f85] hover:text-[#133d67]">
            <User size={20} />
          </Link>
          {session?.user?.role === "ADMIN" ? (
            <Link href="/admin" className="hidden md:block text-[#3b5f85] hover:text-[#133d67]">
              <Shield size={18} />
            </Link>
          ) : null}
          <Menu className="md:hidden text-[#3b5f85]" size={20} />
        </div>
      </nav>
    </motion.header>
  );
};
