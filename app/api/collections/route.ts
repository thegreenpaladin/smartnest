import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  const collections = store.getCollections();

  return NextResponse.json({
    count: collections.length,
    collections,
  });
}
