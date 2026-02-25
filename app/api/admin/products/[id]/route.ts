import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getProductById, updateProduct } from "@/lib/admin-store";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ product });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  const product = updateProduct(id, {
    name: body.name,
    category: body.category,
    price: body.price,
    description: body.description,
    image: body.image,
  });

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ product });
}
