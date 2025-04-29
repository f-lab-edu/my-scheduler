import { NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { getSessionUid } from "@/lib/server/auth";
import { generateInviteCode } from "@/util/helper";

export async function POST(request: Request) {
  try {
    const { teamName } = await request.json();

    const inviterUid = await getSessionUid();
    if (!inviterUid)
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const db = getFirestore();
    const teamId = generateInviteCode(teamName);

    await db
      .collection("teams")
      .doc(teamId)
      .set({
        teamName,
        createdBy: inviterUid,
        members: [inviterUid],
        createdAt: Date.now(),
      });

    return NextResponse.json({ teamId }, { status: 201 });
  } catch (error) {
    console.error("POST /api/teams/create", error);
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}
