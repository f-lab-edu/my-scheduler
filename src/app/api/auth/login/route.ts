import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import "@/lib/firebase";

export async function POST(request: any) {
  try {
    const { token } = await request.json();
    //firebase admin 통해 검증
    const decodedToken = await getAuth().verifyIdToken(token);
    // TODO: 검증 후 세션 쿠키 생성, 사용자 정보를 DB에 저장

    return NextResponse.json({ message: "로그인 성공", uid: decodedToken.uid });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "인증에 실패했습니다." },
      { status: 401 }
    );
  }
}
