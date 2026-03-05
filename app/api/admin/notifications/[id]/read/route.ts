import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { store } from "@/lib/store";

const unauthorized = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export async function PATCH(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return unauthorized();

  const { id } = await params;
  const notification = store.markNotificationRead(id);
  if (!notification) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ notification });
}
