import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDashboardStats } from "@/lib/catalog";

export async function GET() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    stats: getDashboardStats(),
  });
}
