import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { ProductCard } from "@/components/shared/product-card";
import { store } from "@/lib/store";

const TOP_NAV_CATEGORIES = [
  { label: "Lighting", slug: "lighting" },
  { label: "Portable Power", slug: "portable-power" },
  { label: "Personal Climate", slug: "personal-climate" },
  { label: "Utility", slug: "utility" },
];

const BRAND_SPOTLIGHT = [
  {
    name: "Luma",
    copy: "Ambient Lighting",
    offer: "Up to 30% OFF",
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800",
    color: "from-[#121722] to-[#2c3241]",
  },
  {
    name: "Voltix",
    copy: "Portable Power",
    offer: "Fast-charge Essentials",
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800",
    color: "from-[#3f350d] to-[#705d16]",
  },
  {
    name: "AeroNest",
    copy: "Cooling Gadgets",
    offer: "Top Rated Gear",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    color: "from-[#07263a] to-[#0e4a6f]",
  },
];

export default function HomePage() {
  const products = store.getProducts();
  const collections = store.getCollections();
  const discountedProducts = products.filter((product) => product.compareAtPrice && product.compareAtPrice > product.price).slice(0, 5);

  return (
    <main className="bg-[#f4f8fc] text-neutral-900 pb-14">
      <section className="border-y border-[#d8e3f3] bg-white mt-[72px]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap gap-2">
          {TOP_NAV_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="rounded-full border border-[#bfd0e8] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#13558d] hover:bg-[#e9f2fd]"
            >
              {category.label}
            </Link>
          ))}
        </div>
      </section>

      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-5 flex items-center justify-between border-b border-[#d6e1f0] pb-3">
          <h2 className="text-2xl font-bold text-[#103961]">Grab the best deals</h2>
          <Link href="/shop" className="text-xs font-bold uppercase tracking-wide text-[#0f5d9a]">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {discountedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-5 flex items-center justify-between border-b border-[#d6e1f0] pb-3">
          <h2 className="text-2xl font-bold text-[#103961]">Shop by smart categories</h2>
          <Link href="/collections" className="text-xs font-bold uppercase tracking-wide text-[#0f5d9a]">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/shop?category=${collection.slug}`}
              className="border border-[#d4e0ef] bg-white p-4 flex items-center gap-3 hover:border-[#86abd6]"
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-[#d4e0ef]">
                <Image src={collection.image} alt={collection.title} fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#113f6b]">{collection.title}</p>
                <p className="text-[11px] uppercase tracking-wide text-neutral-500">{collection.slug.replace(/-/g, " ")}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-5 flex items-center justify-between border-b border-[#d6e1f0] pb-3">
          <h2 className="text-2xl font-bold text-[#103961]">Top gadget brands</h2>
          <Link href="/shop" className="text-xs font-bold uppercase tracking-wide text-[#0f5d9a]">
            View All
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {BRAND_SPOTLIGHT.map((brand) => (
            <article key={brand.name} className={`relative overflow-hidden border border-[#cad9ec] bg-gradient-to-r ${brand.color} p-5 min-h-44`}>
              <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-100">{brand.name}</p>
              <h3 className="mt-2 text-xl font-bold text-white">{brand.copy}</h3>
              <p className="text-sm text-cyan-100">{brand.offer}</p>
              <div className="absolute right-3 bottom-2 h-28 w-28">
                <Image src={brand.image} alt={brand.copy} fill className="object-contain" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
