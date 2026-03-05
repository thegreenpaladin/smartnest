"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CollectionForm({
  mode,
  initialValues,
  collectionSlug,
}: {
  mode: "create" | "edit";
  initialValues?: { title: string; slug: string; description: string; image: string };
  collectionSlug?: string;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      title: String(form.get("title") ?? ""),
      slug: String(form.get("slug") ?? ""),
      description: String(form.get("description") ?? ""),
      image: String(form.get("image") ?? ""),
    };

    const endpoint = mode === "create" ? "/api/admin/collections" : `/api/admin/collections/${collectionSlug}`;
    const method = mode === "create" ? "POST" : "PUT";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!response.ok) {
      setError("Could not save collection.");
      return;
    }

    router.push("/admin/collections");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="bg-white border border-neutral-100 rounded-3xl p-8 grid gap-5">
      <input name="title" defaultValue={initialValues?.title} className="rounded-xl border border-neutral-200 px-4 py-3" placeholder="Collection title" required />
      <input name="slug" defaultValue={initialValues?.slug} className="rounded-xl border border-neutral-200 px-4 py-3" placeholder="Slug" required />
      <input name="image" defaultValue={initialValues?.image} className="rounded-xl border border-neutral-200 px-4 py-3" placeholder="Image URL" required />
      <textarea name="description" defaultValue={initialValues?.description} className="rounded-xl border border-neutral-200 px-4 py-3" placeholder="Description" rows={4} required />
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      <button disabled={loading} className="rounded-full bg-black text-white px-5 py-3 text-xs font-bold uppercase tracking-widest w-fit disabled:opacity-60">
        {loading ? "Saving..." : mode === "create" ? "Save Collection" : "Update Collection"}
      </button>
    </form>
  );
}
