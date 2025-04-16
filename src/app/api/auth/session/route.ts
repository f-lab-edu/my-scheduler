import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";
import { NextResponse } from "next/server";
import "@/lib/firebase";

export async function GET() {
  const session = (await cookies()).get("session")?.value;

  if (!session) {
    return NextResponse.json({ uid: null });
  }

  try {
    const decoded = await getAuth().verifySessionCookie(session);
    return NextResponse.json({ uid: decoded.uid });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ uid: null });
  }
}
