import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { store } from "@/lib/store";
import { getCollectionCategories } from "@/lib/catalog";

export default function CollectionsPage() {
  const collections = store.getCollections();
  const products = store.getProducts();

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 pb-14">
      <header className="mb-8">
        <h1 className="text-4xl font-serif">Collections</h1>
        <p className="text-sm text-neutral-500 mt-2">Explore gadget-focused collections mapped to real product categories.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((collection) => {
          const mappedCategories = getCollectionCategories(collection.slug);
          const count = products.filter((product) => mappedCategories.includes(product.category.toLowerCase())).length;

          return (
            <Link key={collection.id} href={`/shop?category=${collection.slug}`} className="group border border-neutral-300 bg-white overflow-hidden">
              <div className="relative h-56 w-full">
                <Image src={collection.image} alt={collection.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5 space-y-3 border-t border-neutral-300">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">{collection.title}</h2>
                  <span className="text-xs font-semibold uppercase tracking-wide border border-neutral-300 px-2 py-1">{count} items</span>
                </div>
                <p className="text-sm text-neutral-600">{collection.description}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {mappedCategories.map((category) => (
                    <span key={category} className="text-[10px] uppercase tracking-wide px-2 py-1 border border-neutral-300 text-neutral-600">
                      {category}
                    </span>
                  ))}
                </div>
                <div className="pt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                  Browse Collection <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
