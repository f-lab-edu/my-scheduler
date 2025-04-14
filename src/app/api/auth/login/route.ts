import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import "@/lib/firebase";

export async function POST(request: any) {
  try {
    const { token } = await request.json();
    //firebase admin를 통해 유효한 토큰인지 검증
    const decodedToken = await getAuth().verifyIdToken(token);

    // 사용자의 인증 상태를 서버에서 관리할 수 있도록 하는 "키"
    const sessionCookie = await getAuth().createSessionCookie(token, {
      expiresIn: 60 * 60 * 24 * 5 * 1000, // 5일
    });

    const response = NextResponse.json(
      { message: "로그인 성공", uid: decodedToken.uid },
      { status: 200 }
    );

    response.headers.set(
      "Set-Cookie",
      `session=${sessionCookie}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${
        60 * 60 * 24 * 5
      }`
    );
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "인증에 실패했습니다." },
      { status: 401 }
    );
  }
}
