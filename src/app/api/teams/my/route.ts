import { NextRequest, NextResponse } from "next/server";
import { getFirestore, FieldPath } from "firebase-admin/firestore";
import "@/lib/firebase";
import { getSessionUid } from "@/lib/server/auth";

export async function GET(request: NextRequest) {
  try {
    const uid = await getSessionUid();
    if (!uid) {
      const redirectUrl = new URL(`/auth/login}`, request.url);
      return NextResponse.redirect(redirectUrl);
    }

    // 소속된 팀스케줄 조회
    const db = getFirestore();
    const snap = await db
      .collection("teams")
      .where("members", "array-contains", uid)
      .get();

    const teams = snap.docs.map((doc) => {
      return {
        id: doc.id,
        ...(doc.data() as { teamName: string; members: string[] }),
      };
    });

    const teamsWithProfiles = await Promise.all(
      teams.map(async (team) => {
        // 문서id로 쿼리 -> FieldPath.documentId()
        const profilesSnap = await db
          .collection("users")
          .where(FieldPath.documentId(), "in", team.members)
          .get();

        const members = profilesSnap.docs.map((member) => ({
          uid: member.id,
          ...(member.data() as { email: string; displayName: string }),
        }));

        return {
          ...team,
          members,
        };
      })
    );

    return NextResponse.json(teamsWithProfiles, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}
