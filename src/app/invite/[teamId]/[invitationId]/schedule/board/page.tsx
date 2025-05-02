import Board from "@/app/[teamId]/schedule/[tab]/board/Board";
import { getSessionUid } from "@/lib/server/auth";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { redirect, notFound } from "next/navigation";

interface Props {
  params: Promise<{ teamId: string; invitationId: string }>;
}
export default async function InviteBoardPage({ params }: Props) {
  const { teamId, invitationId } = await params;

  const sessionUid = await getSessionUid();
  if (!sessionUid) {
    return redirect(
      `/auth/login?callbackUrl=/invite/${teamId}/${invitationId}/schedule/board`
    );
  }

  const db = getFirestore();
  const invitationRef = db
    .collection("teams")
    .doc(teamId)
    .collection("invitations")
    .doc(invitationId);

  const invitationSnap = await invitationRef.get();
  if (!invitationSnap.exists) return notFound();

  const inviteeData = invitationSnap.data()!;
  if (inviteeData.expiresAt < Date.now()) return notFound();

  if (inviteeData.accepted) {
    return <Board />;
  }

  await db.runTransaction(async (tx) => {
    tx.update(invitationRef, { accepted: true, acceptedAt: Date.now() });
    tx.update(db.collection("teams").doc(teamId), {
      members: FieldValue.arrayUnion(sessionUid),
    });
  });

  return <Board />;
}
