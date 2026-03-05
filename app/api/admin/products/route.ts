import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { store } from "@/lib/store";

const unauthorized = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return unauthorized();

  return NextResponse.json({ products: store.getProducts() });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return unauthorized();

  const body = (await request.json()) as {
    name?: string;
    category?: string;
    price?: number;
    description?: string;
    image?: string;
    sizes?: string[];
  };

  if (!body.name || !body.category || !body.description || typeof body.price !== "number") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const product = store.createProduct({
    name: body.name,
    category: body.category,
    price: body.price,
    description: body.description,
    images: [body.image || "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800"],
    sizes: body.sizes?.length ? body.sizes : ["Standard"],
    specs: { Material: "N/A", Warranty: "1 Year" },
  });

  return NextResponse.json({ product }, { status: 201 });
}
