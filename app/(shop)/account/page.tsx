import { auth } from "@/auth";
import Link from "next/link";

export default async function AccountPage() {
  const session = await auth();

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-20 space-y-8">
      <header>
        <h1 className="text-4xl font-serif">Account Overview</h1>
        <p className="text-neutral-500 mt-2">Manage your profile and review your latest activity.</p>
      </header>

      <section className="bg-white border border-neutral-100 rounded-3xl p-8 space-y-4">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Signed in as</p>
        <h2 className="text-2xl font-semibold">{session?.user?.email}</h2>
        <p className="text-sm text-neutral-500">Role: {session?.user?.role ?? "USER"}</p>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <Link href="/shop" className="bg-white border border-neutral-100 rounded-3xl p-6 hover:border-neutral-300 transition-colors">
          <h3 className="font-semibold">Continue shopping</h3>
          <p className="text-sm text-neutral-500 mt-1">Browse products and curated collections.</p>
        </Link>
        <Link href="/admin" className="bg-white border border-neutral-100 rounded-3xl p-6 hover:border-neutral-300 transition-colors">
          <h3 className="font-semibold">Admin dashboard</h3>
          <p className="text-sm text-neutral-500 mt-1">Available only if your account has admin permissions.</p>
        </Link>
      </section>
    </div>
  );
}
