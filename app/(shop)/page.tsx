// app/page.tsx
import { Hero } from "@/components/home/hero";
import { ProductShelf } from "@/components/home/product-shelf";

export default function HomePage() {
  return (
    <main className="bg-white">
      <Hero />
      
      {/* Top Selling - No category filter, just first 4 */}
      <ProductShelf title="Top Selling" limit={4} />

      {/* Lighting Section */}
      <div className="bg-neutral-50">
        <ProductShelf title="Smart Lighting" category="lighting" limit={4} />
      </div>

      {/* Portable Power Section */}
      <ProductShelf title="Portable Power" category="utility" limit={4} />
      
      {/* Brand Ethos / Mission Statement */}
      <section className="py-24 bg-black text-white text-center">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <h3 className="text-4xl font-serif italic">&ldquo;Efficiency is the new luxury.&rdquo;</h3>
          <p className="text-neutral-400 text-sm tracking-widest uppercase">Designing for the 2026 Lifestyle</p>
        </div>
      </section>
    </main>
  );
}