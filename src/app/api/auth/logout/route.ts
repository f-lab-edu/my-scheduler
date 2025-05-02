import { NextRequest, NextResponse } from "next/server";

export async function POST(_reqeust: NextRequest) {
  try {
    const response = await NextResponse.json({ success: true });

    response.cookies.set("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: "로그아웃 처리 중 서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
