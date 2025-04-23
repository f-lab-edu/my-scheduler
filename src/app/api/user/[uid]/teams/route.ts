import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import "@/lib/firebase";
import { getSessionUid } from "@/lib/server/auth";

export async function GET(request: NextRequest) {
  const uid = await getSessionUid();

  if (!uid) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const snapshot = await getFirestore()
    .collection("teams")
    .where("members", "array-contains", uid)
    .get();

  const teams = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(teams, { status: 200 });
}
