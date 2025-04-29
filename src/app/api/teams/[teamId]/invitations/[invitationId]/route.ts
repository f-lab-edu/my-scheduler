import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import "@/lib/firebase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ teamId: string; invitationId: string }> }
) {
  const { teamId, invitationId } = await params;
  const docRef = getFirestore()
    .collection("teams")
    .doc(teamId)
    .collection("invitations")
    .doc(invitationId);

  const snapshot = await docRef.get();
  if (!snapshot.exists) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(snapshot.data(), { status: 200 });
}
