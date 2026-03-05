import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { store } from "@/lib/store";

const unauthorized = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return unauthorized();

  return NextResponse.json({ collections: store.getCollections() });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return unauthorized();

  const body = (await request.json()) as {
    title?: string;
    slug?: string;
    description?: string;
    image?: string;
  };

  if (!body.title || !body.slug || !body.description || !body.image) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const collection = store.createCollection({
    title: body.title,
    slug: body.slug,
    description: body.description,
    image: body.image,
  });

  return NextResponse.json({ collection }, { status: 201 });
}
