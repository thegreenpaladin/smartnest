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
    color: "from-[#0f3559] to-[#1a5a89]",
  },
  {
    name: "Voltix",
    copy: "Portable Power",
    offer: "Fast-charge Essentials",
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800",
    color: "from-[#17446f] to-[#24699b]",
  },
  {
    name: "AeroNest",
    copy: "Cooling Gadgets",
    offer: "Top Rated Gear",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    color: "from-[#12345e] to-[#1b4e7e]",
  },
];

export default function HomePage() {
  const products = store.getProducts();
  const collections = store.getCollections();
  const discountedProducts = products.filter((product) => product.compareAtPrice && product.compareAtPrice > product.price).slice(0, 5);

  return (
    <main className="bg-[#f2f7fc] text-neutral-900 pb-14">
      <section className="border-y border-[#d3e1f1] bg-[#f8fbff]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap gap-2">
          {TOP_NAV_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="rounded-full border border-[#bcd1e8] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#1a557f] hover:bg-[#eaf3fe]"
            >
              {category.label}
            </Link>
          ))}
        </div>
      </section>

      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-5 flex items-center justify-between border-b border-[#d2e0f0] pb-3">
          <h2 className="text-2xl font-bold text-[#0f3d68]">Grab the best deals</h2>
          <Link href="/shop" className="text-xs font-bold uppercase tracking-wide text-[#145b8f]">
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
        <div className="mb-5 flex items-center justify-between border-b border-[#d2e0f0] pb-3">
          <h2 className="text-2xl font-bold text-[#0f3d68]">Shop by smart categories</h2>
          <Link href="/collections" className="text-xs font-bold uppercase tracking-wide text-[#145b8f]">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/shop?category=${collection.slug}`}
              className="border border-[#d2e0f0] bg-white p-4 flex items-center gap-3 hover:border-[#88afd3]"
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-[#d2e0f0]">
                <Image src={collection.image} alt={collection.title} fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#13466f]">{collection.title}</p>
                <p className="text-[11px] uppercase tracking-wide text-[#6786a6]">{collection.slug.replace(/-/g, " ")}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-5 flex items-center justify-between border-b border-[#d2e0f0] pb-3">
          <h2 className="text-2xl font-bold text-[#0f3d68]">Top gadget brands</h2>
          <Link href="/shop" className="text-xs font-bold uppercase tracking-wide text-[#145b8f]">
            View All
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {BRAND_SPOTLIGHT.map((brand) => (
            <article key={brand.name} className={`relative overflow-hidden border border-[#bfd4ea] bg-gradient-to-r ${brand.color} p-5 min-h-44`}>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#d2ecff]">{brand.name}</p>
              <h3 className="mt-2 text-xl font-bold text-white">{brand.copy}</h3>
              <p className="text-sm text-[#d2ecff]">{brand.offer}</p>
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
