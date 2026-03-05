import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { store } from "@/lib/store";
import { FulfillmentStatus } from "@/lib/types";

const unauthorized = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return unauthorized();

  const { id } = await params;
  const body = (await request.json()) as { fulfillmentStatus?: FulfillmentStatus };

  if (!body.fulfillmentStatus) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const order = store.updateOrder(id, { fulfillmentStatus: body.fulfillmentStatus });
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ order });
}
