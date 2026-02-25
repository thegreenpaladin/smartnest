import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { store } from "@/lib/store";

export default function AdminCollectionsPage() {
  const collections = store.getCollections();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-serif">Collections</h1>
        <Link
          href="/admin/collections/new"
          className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-neutral-800 transition-colors"
        >
          <Plus size={14} />
          Add Collection
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {collections.map((collection) => (
          <article key={collection.id} className="bg-white border border-neutral-100 rounded-3xl p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">{collection.title}</h2>
                <p className="text-sm text-neutral-500 mt-1">/{collection.slug}</p>
              </div>
              <Link
                href={`/admin/collections/${collection.slug}/edit`}
                className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:border-black hover:text-black transition-colors"
              >
                <Pencil size={12} />
                Edit
              </Link>
            </div>
            <p className="text-neutral-600">{collection.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
