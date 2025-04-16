"use client";
import profileIcon from "@/assets/person-circle.svg";
import IconButton from "../common/button/IconButton";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const handleLogin = async () => {
    const response = await fetch("/api/auth/session");
    const { uid } = await response.json();

    if (uid) {
      router.push(`/mypage/${uid}`);
      console.log("🥲", uid);
    } else {
      router.push("/auth/login");
    }
  };
  return (
    <div className="flex justify-between py-[51px] px-[45px] text-4xl font-extrabold text-white bg-headerBlue">
      <h1>My Scheduler</h1>

      <IconButton
        icon={profileIcon}
        size="md"
        onClick={handleLogin}
        alt="profile icon"
      />
    </div>
  );
}
