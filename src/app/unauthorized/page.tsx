"use client";
import Link from "next/link";
export default function UnauthorizedPage() {
  return (
    <div className="text-center mt-40">
      <h1 className="text-2xl font-bold mb-4">접근 권한이 없습니다</h1>
      <p className="mb-6">로그인이 필요하거나 권한이 없습니다.</p>
      <Link
        href="/auth/login"
        className="text-white border-b border-white pb-0.5"
      >
        Login
      </Link>
    </div>
  );
}
