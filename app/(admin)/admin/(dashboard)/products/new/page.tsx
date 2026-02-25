import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <header>
        <h1 className="text-3xl font-serif">Add Product</h1>
        <p className="text-neutral-500 mt-1">Create a new product entry for the storefront catalog.</p>
      </header>

      <ProductForm mode="create" />
    </div>
  );
}
