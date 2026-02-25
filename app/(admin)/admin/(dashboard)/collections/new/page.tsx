export default function NewCollectionPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <header>
        <h1 className="text-3xl font-serif">Add Collection</h1>
        <p className="text-neutral-500 mt-1">Create a new curated collection.</p>
      </header>

      <form className="bg-white border border-neutral-100 rounded-3xl p-8 grid gap-5">
        <input className="rounded-xl border border-neutral-200 px-4 py-3" placeholder="Collection title" />
        <input className="rounded-xl border border-neutral-200 px-4 py-3" placeholder="Slug" />
        <textarea className="rounded-xl border border-neutral-200 px-4 py-3" placeholder="Description" rows={4} />
        <button type="button" className="rounded-full bg-black text-white px-5 py-3 text-xs font-bold uppercase tracking-widest w-fit">
          Save Collection
        </button>
      </form>
    </div>
  );
}
