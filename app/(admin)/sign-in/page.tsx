"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AdminSignIn() {
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
      callbackUrl: "/admin",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-sm p-8 border border-neutral-100 rounded-[2.5rem] shadow-xl shadow-neutral-100">
        <h1 className="font-serif text-3xl mb-8 text-center">Admin Access</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold">Email</label>
            <input name="email" type="email" required className="w-full p-4 bg-neutral-50 rounded-2xl outline-none focus:ring-1 ring-black transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold">Password</label>
            <input name="password" type="password" required className="w-full p-4 bg-neutral-50 rounded-2xl outline-none focus:ring-1 ring-black transition-all" />
          </div>
          <button className="w-full bg-black text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all">
            Enter Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}