import { CollectionForm } from "@/components/admin/collection-form";

export default function NewCollectionPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <header>
        <h1 className="text-3xl font-serif">Add Collection</h1>
        <p className="text-neutral-500 mt-1">Create a new curated collection.</p>
      </header>

      <CollectionForm mode="create" />
    </div>
  );
}
