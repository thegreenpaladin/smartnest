import { Hero } from "@/components/home/hero";
import { ProductShelf } from "@/components/home/product-shelf";

export default function HomePage() {
  return (
    <main className="bg-white">
      <Hero />

      <ProductShelf title="Top Selling" limit={4} />

      <div className="bg-neutral-50">
        <ProductShelf title="Smart Lighting" category="lighting" limit={4} />
      </div>

      <ProductShelf title="Power & Charging" category="portable-power" limit={4} />

      <section className="py-14 bg-black text-white text-center">
        <div className="max-w-2xl mx-auto px-6 space-y-4">
          <h3 className="text-3xl font-serif italic">&ldquo;Efficiency is the new luxury.&rdquo;</h3>
          <p className="text-neutral-400 text-xs tracking-widest uppercase">Designing for the 2026 Lifestyle</p>
        </div>
      </section>
    </main>
  );
}
