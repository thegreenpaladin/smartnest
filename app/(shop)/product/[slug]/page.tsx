// app/product/[slug]/page.tsx
import { PRODUCTS } from "@/lib/data";
import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/product/product-details";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <ProductDetails product={product} />
    </div>
  );
}