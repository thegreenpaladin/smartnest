import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { store } from "@/lib/store";

const unauthorized = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return unauthorized();

  const { id } = await params;
  const product = store.getProductById(id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ product });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return unauthorized();

  const body = (await request.json()) as {
    name?: string;
    category?: string;
    price?: number;
    description?: string;
    image?: string;
  };

  if (!body.name || !body.category || !body.description || typeof body.price !== "number") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { id } = await params;
  const existing = store.getProductById(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const product = store.updateProduct(id, {
    name: body.name,
    category: body.category,
    price: body.price,
    description: body.description,
    images: [body.image || existing.images[0]],
  });

  return NextResponse.json({ product });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return unauthorized();

  const { id } = await params;
  const deleted = store.deleteProduct(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ deleted: true });
}
