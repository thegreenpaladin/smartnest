import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/product/product-details";
import { store } from "@/lib/store";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = store.getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <ProductDetails product={product} />
    </div>
  );
}
