import { NextRequest, NextResponse } from "next/server";
import { getProductsByCategory, searchProducts } from "@/lib/catalog";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category") ?? "all";
  const query = searchParams.get("q") ?? "";

  const products = query ? searchProducts(query) : getProductsByCategory(category);

  return NextResponse.json({
    count: products.length,
    products,
  });
}
