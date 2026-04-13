import { buildSearchIndex } from "@/lib/search-index";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  const index = buildSearchIndex();
  return NextResponse.json(index);
}
