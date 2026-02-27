import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { store } from "@/lib/store";

const unauthorized = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return unauthorized();

  return NextResponse.json({ notifications: store.getNotifications() });
}
