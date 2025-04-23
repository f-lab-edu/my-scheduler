import { NextRequest, NextResponse } from "next/server";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import "@/lib/firebase";
import { getSessionUid } from "@/lib/server/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ teamId: string }> }
) {
  try {
    const { teamId } = await params;

    const uid = await getSessionUid();
    if (!uid) {
      const redirectUrl = new URL(`/auth/login}`, request.url);
      return NextResponse.redirect(redirectUrl);
    }

    const user = await getAuth().getUser(uid);
    const email = user.email;
    if (!email) {
      return NextResponse.json(
        { error: "사용자 이메일 정보를 불러올 수 없습니다." },
        { status: 500 }
      );
    }

    const db = getFirestore();
    const invitationColumn = db
      .collection("teams")
      .doc(teamId)
      .collection("invitations");

    // 2) 이 uid(email)용 초대 레코드 찾기
    const snapshot = await invitationColumn
      .where("inviteeEmail", "==", email)
      .where("accepted", "==", false)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        { error: "유효한 초대가 없거나 이미 수락되었습니다." },
        { status: 404 }
      );
    }

    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.update(doc.ref, {
        accepted: true,
        acceptedAt: Date.now(),
      });
    });

    // 팀에 사용자 추가
    const teamRef = db.collection("teams").doc(teamId);
    batch.update(teamRef, {
      members: FieldValue.arrayUnion(uid),
    });

    await batch.commit();

    const redirectUrl = new URL(`/teams/${teamId}/schedule/board`, request.url);
    return NextResponse.redirect(redirectUrl);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}
