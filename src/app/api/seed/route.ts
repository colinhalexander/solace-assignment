import { NextRequest, NextResponse } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function POST(req: NextRequest) {
  try {
    const n = req.nextUrl.searchParams.get("n");
    const numAdvocates =
      n == null || Number.isNaN(Number(n)) ? undefined : Number(n);
    const records = await db
      .insert(advocates)
      .values(advocateData(numAdvocates))
      .returning();

    return NextResponse.json({ advocates: records });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
