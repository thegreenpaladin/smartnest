"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ProductFormValues = {
  name: string;
  category: string;
  price: number;
  description: string;
  image?: string;
};

export function ProductForm({
  mode,
  initialValues,
  productId,
}: {
  mode: "create" | "edit";
  initialValues?: ProductFormValues;
  productId?: string;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      category: String(form.get("category") ?? ""),
      price: Number(form.get("price") ?? 0),
      description: String(form.get("description") ?? ""),
      image: String(form.get("image") ?? ""),
    };

    const endpoint = mode === "create" ? "/api/admin/products" : `/api/admin/products/${productId}`;
    const method = mode === "create" ? "POST" : "PUT";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!response.ok) {
      setError("Could not save product. Please check fields and try again.");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-neutral-100 rounded-3xl p-8 grid gap-5">
      <input name="name" defaultValue={initialValues?.name} className="rounded-xl border border-neutral-200 px-4 py-3" placeholder="Product name" required />
      <input name="category" defaultValue={initialValues?.category} className="rounded-xl border border-neutral-200 px-4 py-3" placeholder="Category" required />
      <input
        name="price"
        type="number"
        min="0"
        step="0.01"
        defaultValue={initialValues?.price}
        className="rounded-xl border border-neutral-200 px-4 py-3"
        placeholder="Price"
        required
      />
      <input name="image" defaultValue={initialValues?.image} className="rounded-xl border border-neutral-200 px-4 py-3" placeholder="Image URL (optional)" />
      <textarea
        name="description"
        defaultValue={initialValues?.description}
        className="rounded-xl border border-neutral-200 px-4 py-3"
        placeholder="Description"
        rows={4}
        required
      />
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      <button disabled={loading} className="rounded-full bg-black text-white px-5 py-3 text-xs font-bold uppercase tracking-widest w-fit disabled:opacity-60">
        {loading ? "Saving..." : mode === "create" ? "Save Product" : "Update Product"}
      </button>
    </form>
  );
}
