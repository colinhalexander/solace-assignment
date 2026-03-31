import { NextResponse } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET() {
  const data = await db.select().from(advocates);

  return NextResponse.json({ data });
}
