import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.set("session", "", {
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: "로그아웃 처리 중 서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
