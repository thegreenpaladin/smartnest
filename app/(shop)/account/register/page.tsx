"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AccountRegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    };

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const result = (await response.json()) as { error?: string };
      setError(result.error ?? "Failed to register account.");
      setLoading(false);
      return;
    }

    await signIn("credentials", {
      email: payload.email,
      password: payload.password,
      redirect: true,
      callbackUrl: "/account",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 flex items-center justify-center">
      <div className="w-full max-w-sm p-8 border border-neutral-100 rounded-[2.5rem] shadow-xl shadow-neutral-100 bg-white">
        <h1 className="font-serif text-3xl mb-2 text-center">Create account</h1>
        <p className="text-neutral-500 text-sm text-center mb-8">Register for order tracking and faster checkout.</p>

        <form onSubmit={onSubmit} className="space-y-5">
          <input name="name" placeholder="Full name" required className="w-full p-4 bg-neutral-50 rounded-2xl outline-none focus:ring-1 ring-black" />
          <input name="email" type="email" placeholder="Email" required className="w-full p-4 bg-neutral-50 rounded-2xl outline-none focus:ring-1 ring-black" />
          <input name="password" type="password" placeholder="Password" required className="w-full p-4 bg-neutral-50 rounded-2xl outline-none focus:ring-1 ring-black" />
          {error ? <p className="text-xs text-red-500">{error}</p> : null}
          <button disabled={loading} className="w-full bg-black text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest disabled:opacity-60">
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="text-xs text-neutral-500 text-center mt-6">
          Already have an account? <Link href="/account/sign-in" className="text-black underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
