import { NextResponse } from "next/server";
import { getSessionUid } from "@/lib/server/auth";
import "@/lib/firebase";

export async function GET() {
  const uid = await getSessionUid();
  return NextResponse.json({ uid });
}
