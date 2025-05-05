"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileIcon from "@/assets/person-circle.svg";

interface Props {
  uid: string | null;
}
export default function Header({ uid }: Props) {
  const path = usePathname();

  return (
    <header className="flex justify-between items-center p-6 bg-headerBlue text-white">
      <h1 className="text-2xl font-bold">My Scheduler</h1>
      <nav className="space-x-4">
        {uid ? (
          <>
            <div className="flex items-center gap-3">
              <form action="/api/auth/logout" method="post" className="inline">
                <button type="submit" className="underline">
                  Log out
                </button>
              </form>
              <Link href={`/mypage/${uid}`} className="underline">
                <ProfileIcon width={24} height={24} />
              </Link>
            </div>
          </>
        ) : (
          <Link
            href={`/auth/login?callbackUrl=${encodeURIComponent(path)}`}
            className="underline"
          >
            Log in
          </Link>
        )}
      </nav>
    </header>
  );
}
