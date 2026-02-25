import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createProduct, getProducts } from "@/lib/admin-store";

export async function GET() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ products: getProducts() });
}

export async function POST(request: Request) {
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

  const product = createProduct({
    name: body.name,
    category: body.category,
    price: body.price,
    description: body.description,
    image: body.image,
  });

  return NextResponse.json({ product }, { status: 201 });
}
