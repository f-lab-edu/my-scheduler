"use client";
import Link from "next/link";
export default function UnauthorizedPage() {
  return (
    <div className="text-center mt-60">
      <p className="mb-6 text-gray-500">로그인이 필요하거나 권한이 없습니다.</p>
      <div className="flex gap-2 justify-center">
        <Link
          href="/auth/login"
          className="text-white border-b border-white pb-0.5"
        >
          Login
        </Link>
        <span className="text-gray-500">or</span>
        <Link
          href="/auth/register"
          className="text-white border-b border-white pb-0.5"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
