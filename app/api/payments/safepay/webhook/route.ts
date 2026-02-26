import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    order_id?: string;
    status?: "paid" | "failed";
  };

  if (!body.order_id || !body.status) {
    return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
  }

  const order = store.getOrderById(body.order_id);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  store.updateOrder(order.id, {
    paymentStatus: body.status === "paid" ? "PAID" : "FAILED",
  });

  return NextResponse.json({ received: true });
}
