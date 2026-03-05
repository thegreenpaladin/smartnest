import { CollectionForm } from "@/components/admin/collection-form";
import { store } from "@/lib/store";
import { notFound } from "next/navigation";

export default async function EditCollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = store.getCollectionBySlug(slug);

  if (!collection) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <header>
        <h1 className="text-3xl font-serif">Edit Collection</h1>
        <p className="text-neutral-500 mt-1">Update the “{collection.title}” collection details.</p>
      </header>

      <CollectionForm
        mode="edit"
        collectionSlug={collection.slug}
        initialValues={{
          title: collection.title,
          slug: collection.slug,
          description: collection.description,
          image: collection.image,
        }}
      />
    </div>
  );
}
