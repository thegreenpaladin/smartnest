import { COLLECTIONS } from "@/lib/data";

export default function AdminCollectionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-serif">Collections</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {COLLECTIONS.map((collection) => (
          <article key={collection.id} className="bg-white border border-neutral-100 rounded-3xl p-6">
            <h2 className="text-xl font-semibold">{collection.title}</h2>
            <p className="text-sm text-neutral-500 mt-2">/{collection.slug}</p>
            <p className="mt-4 text-neutral-600">{collection.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
