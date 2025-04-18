import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const response = await fetch(new URL("/api/auth/session", request.url));
    const { uid } = await response.json();

    if (uid) {
      return NextResponse.redirect(`/mypage/${uid}`);
    }
  }

  return NextResponse.next();
}
