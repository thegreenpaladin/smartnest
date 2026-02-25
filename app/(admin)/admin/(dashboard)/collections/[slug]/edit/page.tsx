import { COLLECTIONS } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function EditCollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((item) => item.slug === slug);

  if (!collection) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <header>
        <h1 className="text-3xl font-serif">Edit Collection</h1>
        <p className="text-neutral-500 mt-1">Update the “{collection.title}” collection details.</p>
      </header>

      <form className="bg-white border border-neutral-100 rounded-3xl p-8 grid gap-5">
        <input defaultValue={collection.title} className="rounded-xl border border-neutral-200 px-4 py-3" />
        <input defaultValue={collection.slug} className="rounded-xl border border-neutral-200 px-4 py-3" />
        <textarea defaultValue={collection.description} className="rounded-xl border border-neutral-200 px-4 py-3" rows={4} />
        <button type="button" className="rounded-full bg-black text-white px-5 py-3 text-xs font-bold uppercase tracking-widest w-fit">
          Update Collection
        </button>
      </form>
    </div>
  );
}
