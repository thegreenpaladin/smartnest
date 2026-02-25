"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function UserForm({
  mode,
  userId,
  initialValues,
}: {
  mode: "create" | "edit";
  userId?: string;
  initialValues?: { name: string; email: string; role: "ADMIN" | "USER" };
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? "").toLowerCase(),
      role: String(form.get("role") ?? "USER") as "ADMIN" | "USER",
      password: String(form.get("password") ?? ""),
    };

    const endpoint = mode === "create" ? "/api/admin/users" : `/api/admin/users/${userId}`;
    const method = mode === "create" ? "POST" : "PUT";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!response.ok) {
      setError("Could not save user.");
      return;
    }

    router.push("/admin/users");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="bg-white border border-neutral-100 rounded-3xl p-8 grid gap-5">
      <input name="name" defaultValue={initialValues?.name} className="rounded-xl border border-neutral-200 px-4 py-3" placeholder="Full name" required />
      <input name="email" type="email" defaultValue={initialValues?.email} className="rounded-xl border border-neutral-200 px-4 py-3" placeholder="Email" required />
      <select name="role" defaultValue={initialValues?.role ?? "USER"} className="rounded-xl border border-neutral-200 px-4 py-3" required>
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
      </select>
      <input name="password" type="password" className="rounded-xl border border-neutral-200 px-4 py-3" placeholder={mode === "create" ? "Password" : "New password (optional)"} required={mode === "create"} />
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      <button disabled={loading} className="rounded-full bg-black text-white px-5 py-3 text-xs font-bold uppercase tracking-widest w-fit disabled:opacity-60">
        {loading ? "Saving..." : mode === "create" ? "Create User" : "Update User"}
      </button>
    </form>
  );
}
