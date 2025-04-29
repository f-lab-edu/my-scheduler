import Board from "@/app/[teamId]/schedule/[tab]/board/Board";
import { getSessionUid } from "@/lib/server/auth";
import { getFirestore } from "firebase-admin/firestore";
import { redirect, notFound } from "next/navigation";

interface Props {
  params: { teamId: string; invitationId: string };
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

  const invite = invitationSnap.data()!;
  if (invite.expiresAt < Date.now()) return notFound();

  // 미수락 시 -> 수락 요청
  if (!invite.accepted) {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_URL
        : process.env.NEXT_PUBLIC_DEV_URL;

    const response = await fetch(
      `${baseUrl}/api/teams/${teamId}/invitations/${invitationId}`,
      { method: "POST", cache: "no-store" }
    );
    if (!response.ok) return notFound();
  }

  return <Board />;
}
