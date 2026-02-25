export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-3xl font-serif">Admin Settings</h1>
      <section className="bg-white border border-neutral-100 rounded-3xl p-8 space-y-4">
        <h2 className="text-xl font-semibold">Authentication notes</h2>
        <ul className="list-disc list-inside text-neutral-600 space-y-2">
          <li>Set <code>ADMIN_EMAIL</code> and <code>ADMIN_PASSWORD</code> for dashboard access.</li>
          <li>Optional customer login uses <code>USER_EMAILS</code> (comma separated) and <code>USER_PASSWORD</code>.</li>
          <li>Middleware now protects both <code>/admin</code> and <code>/account</code> routes.</li>
        </ul>
      </section>
    </div>
  );
}
