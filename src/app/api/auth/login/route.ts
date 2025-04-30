import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "firebase-admin/auth";
import "@/lib/firebase";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { token } = await request.json();
    //firebase admin를 통해 유효한 토큰인지 검증
    const decodedToken = await getAuth().verifyIdToken(token);

    const baseUrl = request.nextUrl.origin;
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
    const targetUrl = callbackUrl
      ? new URL(callbackUrl, baseUrl).toString()
      : new URL(`/mypage/${decodedToken.uid}`, baseUrl).toString();

    // 사용자의 인증 상태를 서버에서 관리할 수 있도록 하는 "키"
    const sessionCookie = await getAuth().createSessionCookie(token, {
      expiresIn: 60 * 60 * 24 * 5 * 1000, // 5일
    });

    const response = NextResponse.redirect(targetUrl, 303); //303: 쿠키설정 + GET 방식 리다이렉트

    response.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 5, // 5일(초)
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "인증에 실패했습니다." },
      { status: 401 }
    );
  }
}
