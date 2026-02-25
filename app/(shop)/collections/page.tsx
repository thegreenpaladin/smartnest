// app/collections/page.tsx
import { COLLECTIONS } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-200">
        {COLLECTIONS.map((col, index) => (
          <Link
            key={col.id}
            href={`/shop?category=${col.slug}`}
            className={cn(
              "group relative overflow-hidden rounded-[2rem] bg-neutral-900",
              index === 0 ? "md:col-span-8 md:row-span-1" : "md:col-span-4",
              index === 2 ? "md:col-span-12 md:row-span-1" : ""
            )}
          >
            <Image
              src={col.image}
              alt={col.title}
              fill
              className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-10 left-10 space-y-2">
              <h2 className="text-4xl font-serif text-white">{col.title}</h2>
              <p className="text-neutral-300 max-w-xs text-sm">{col.description}</p>
              <div className="pt-4 flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest">
                Explore Items <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}