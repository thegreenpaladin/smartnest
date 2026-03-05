import { NextResponse } from "next/server";
import { store } from "@/lib/store";

interface CartPayload {
  productId: string;
  quantity: number;
}

export async function POST(request: Request) {
  const body = (await request.json()) as { items?: CartPayload[] };
  const items = body.items ?? [];

  const normalizedItems = items
    .map((item) => {
      const product = store.getProductById(item.productId);
      if (!product) return null;

      const quantity = Math.max(1, Number(item.quantity) || 1);
      return {
        productId: product.id,
        name: product.name,
        unitPrice: product.price,
        quantity,
        lineTotal: product.price * quantity,
      };
    })
    .filter(Boolean);

  const subtotal = normalizedItems.reduce((sum, item) => sum + (item?.lineTotal ?? 0), 0);

  return NextResponse.json({ items: normalizedItems, subtotal });
}
