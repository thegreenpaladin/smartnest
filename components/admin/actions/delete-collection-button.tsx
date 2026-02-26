"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteCollectionButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    const confirmed = window.confirm("Delete this collection?");
    if (!confirmed) return;

    setLoading(true);
    const response = await fetch(`/api/admin/collections/${slug}`, { method: "DELETE" });
    setLoading(false);

    if (!response.ok) {
      window.alert("Unable to delete collection.");
      return;
    }

    router.refresh();
  };

  return (
    <button
      onClick={onDelete}
      disabled={loading}
      className="inline-flex items-center gap-1 rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:border-red-400 disabled:opacity-60"
    >
      <Trash2 size={12} />
      Delete
    </button>
  );
}
