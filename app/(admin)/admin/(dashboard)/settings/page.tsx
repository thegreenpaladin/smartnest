import { store } from "@/lib/store";

export default function AdminSettingsPage() {
  const users = store.getUsers();

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-3xl font-serif">Admin Settings</h1>
      <section className="bg-white border border-neutral-100 rounded-3xl p-8 space-y-4">
        <h2 className="text-xl font-semibold">Central Data Source</h2>
        <ul className="list-disc list-inside text-neutral-600 space-y-2">
          <li>All app entities are now served from a single in-memory store in <code>lib/store.ts</code>.</li>
          <li>Products, collections, and users share one source of truth.</li>
          <li>Admin CRUD APIs mutate the same store so UI and API responses stay in sync.</li>
        </ul>
      </section>

      <section className="bg-white border border-neutral-100 rounded-3xl p-8 space-y-4">
        <h2 className="text-xl font-semibold">Current user records</h2>
        <div className="space-y-2 text-sm text-neutral-600">
          {users.map((user) => (
            <p key={user.id}>{user.email} — {user.role}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
