// components/home/hero.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-neutral-900">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=2000" 
          alt="Smart Tech Background"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-neutral-900" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-blue-400"
        >
          The Future of Utility
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl font-serif text-5xl md:text-7xl text-white leading-tight"
        >
          Smarter Tools for <br /> Modern Living.
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex gap-4"
        >
          <Link href="/shop" className="bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-black hover:bg-neutral-200 transition-all rounded-full">
            Shop All
          </Link>
          <Link href="/collections" className="border border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-all rounded-full backdrop-blur-sm">
            Explore Edits
          </Link>
        </motion.div>
      </div>
    </section>
  );
};