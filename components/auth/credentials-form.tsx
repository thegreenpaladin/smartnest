"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

interface CredentialsFormProps {
  title: string;
  callbackUrl: string;
  helperText: string;
}

export function CredentialsForm({ title, callbackUrl, helperText }: CredentialsFormProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid credentials. Please try again.");
      return;
    }

    window.location.href = result?.url ?? callbackUrl;
  };

  return (
    <div className="w-full max-w-sm p-8 border border-neutral-100 rounded-[2.5rem] shadow-xl shadow-neutral-100 bg-white">
      <h1 className="font-serif text-3xl mb-2 text-center">{title}</h1>
      <p className="text-neutral-500 text-sm text-center mb-8">{helperText}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full p-4 bg-neutral-50 rounded-2xl outline-none focus:ring-1 ring-black transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full p-4 bg-neutral-50 rounded-2xl outline-none focus:ring-1 ring-black transition-all"
          />
        </div>

        {error ? <p className="text-xs text-red-500">{error}</p> : null}

        <button
          disabled={loading}
          className="w-full bg-black text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Continue"}
        </button>
      </form>
    </div>
  );
}
