import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
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
    const snap = await getFirestore()
      .collection("teams")
      .where("members", "array-contains", uid)
      .get();

    const teams = snap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as { teamName: string; members: string[] }),
    }));

    return NextResponse.json(teams, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}
