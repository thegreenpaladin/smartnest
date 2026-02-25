import { NextResponse } from "next/server";
import { COLLECTIONS } from "@/lib/data";

export async function GET() {
  return NextResponse.json({
    count: COLLECTIONS.length,
    collections: COLLECTIONS,
  });
}
