import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const cookie = request.headers.get("cookie") ?? "";
    const response = await fetch(new URL("/api/auth/session", request.url), {
      headers: { cookie },
    });
    const { uid } = await response.json();

    if (uid) {
      const redirectUrl = new URL(`/mypage/${uid}`, request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}
