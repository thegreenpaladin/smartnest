"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FulfillmentStatus } from "@/lib/types";

const statuses: FulfillmentStatus[] = ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export function OrderStatusSelect({ id, current }: { id: string; current: FulfillmentStatus }) {
  const router = useRouter();
  const [value, setValue] = useState<FulfillmentStatus>(current);

  const onChange = async (next: FulfillmentStatus) => {
    setValue(next);
    const response = await fetch(`/api/admin/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fulfillmentStatus: next }),
    });

    if (!response.ok) {
      setValue(current);
      window.alert("Failed to update order status.");
      return;
    }

    router.refresh();
  };

  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as FulfillmentStatus)}
      className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs"
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}
