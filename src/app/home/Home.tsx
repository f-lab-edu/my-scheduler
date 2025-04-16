"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-80 text-center text-xl">
      <Link
        href="/auth/login"
        className="text-white border-b border-white pb-0.5"
      >
        Login
      </Link>
    </div>
  );
}
