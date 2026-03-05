import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { store } from "@/lib/store";
import { AppUser } from "@/lib/types";

const unauthorized = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });
const omitPassword = (user: AppUser) => ({ id: user.id, name: user.name, email: user.email, role: user.role });

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return unauthorized();

  const { id } = await params;
  const user = store.getUserById(id);
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ user: omitPassword(user) });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return unauthorized();

  const { id } = await params;
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    password?: string;
    role?: "ADMIN" | "USER";
  };

  const updates = {
    name: body.name,
    email: body.email?.toLowerCase(),
    role: body.role,
    ...(body.password ? { password: body.password } : {}),
  };

  const user = store.updateUser(id, updates);

  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ user: omitPassword(user) });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return unauthorized();

  const { id } = await params;
  const deleted = store.deleteUser(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ deleted: true });
}
