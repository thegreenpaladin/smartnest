import { PRODUCTS } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find((item) => item.id === id);

  if (!product) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <header>
        <h1 className="text-3xl font-serif">Edit Product</h1>
        <p className="text-neutral-500 mt-1">Update catalog details for {product.name}.</p>
      </header>

      <form className="bg-white border border-neutral-100 rounded-3xl p-8 grid gap-5">
        <input defaultValue={product.name} className="rounded-xl border border-neutral-200 px-4 py-3" />
        <input defaultValue={product.category} className="rounded-xl border border-neutral-200 px-4 py-3" />
        <input defaultValue={String(product.price)} className="rounded-xl border border-neutral-200 px-4 py-3" />
        <textarea defaultValue={product.description} className="rounded-xl border border-neutral-200 px-4 py-3" rows={4} />
        <button type="button" className="rounded-full bg-black text-white px-5 py-3 text-xs font-bold uppercase tracking-widest w-fit">
          Update Product
        </button>
      </form>
    </div>
  );
}
