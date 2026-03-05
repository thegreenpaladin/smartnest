import { ProductForm } from "@/components/admin/product-form";
import { store } from "@/lib/store";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = store.getProductById(id);

  if (!product) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <header>
        <h1 className="text-3xl font-serif">Edit Product</h1>
        <p className="text-neutral-500 mt-1">Update catalog details for {product.name}.</p>
      </header>

      <ProductForm
        mode="edit"
        productId={product.id}
        initialValues={{
          name: product.name,
          category: product.category,
          price: product.price,
          description: product.description,
          image: product.images[0],
        }}
      />
    </div>
  );
}
