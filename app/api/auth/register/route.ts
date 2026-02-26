import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!body.name || !body.email || !body.password) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const email = body.email.toLowerCase();
  if (store.getUserByEmail(email)) {
    return NextResponse.json({ error: "Account already exists" }, { status: 409 });
  }

  const user = store.createUser({
    name: body.name,
    email,
    password: body.password,
    role: "USER",
  });

  return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } }, { status: 201 });
}
