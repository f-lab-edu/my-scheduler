import { NextRequest, NextResponse } from "next/server";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import "@/lib/firebase";
import { getSessionUid } from "@/lib/server/auth";

export async function GET(
  req: NextRequest,
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

// 수락
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ teamId: string; invitationId: string }> }
) {
  const { teamId, invitationId } = await params;
  const uid = await getSessionUid();
  const db = getFirestore();
  const invitationRef = db
    .collection("teams")
    .doc(teamId)
    .collection("invitations")
    .doc(invitationId);

  const invSnap = await invitationRef.get();
  if (!invSnap.exists || invSnap.data()!.accepted) {
    return NextResponse.json(
      { error: "유효하지 않거나 이미 수락된 초대" },
      { status: 404 }
    );
  }

  const teamRef = db.collection("teams").doc(teamId);

  await db.runTransaction(async (transaction) => {
    transaction.update(invitationRef, {
      accepted: true,
      acceptedAt: Date.now(),
    });
    transaction.update(teamRef, {
      members: FieldValue.arrayUnion(uid),
    });
  });
  // TODO: 확인
  return NextResponse.redirect(`/teams/${teamId}/schedule/board`);
}
