import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { store } from "@/lib/store";
import { AppUser } from "@/lib/types";

const unauthorized = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });
const omitPassword = (user: AppUser) => ({ id: user.id, name: user.name, email: user.email, role: user.role });

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return unauthorized();

  return NextResponse.json({ users: store.getUsers().map(omitPassword) });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return unauthorized();

  const body = (await request.json()) as {
    name?: string;
    email?: string;
    password?: string;
    role?: "ADMIN" | "USER";
  };

  if (!body.name || !body.email || !body.password || !body.role) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const user = store.createUser({
    name: body.name,
    email: body.email.toLowerCase(),
    password: body.password,
    role: body.role,
  });

  return NextResponse.json({ user: omitPassword(user) }, { status: 201 });
}
