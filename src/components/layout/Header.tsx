"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import IconButton from "@/components/common/button/IconButton";
import profileIcon from "@/assets/person-circle.svg";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth/login");
  };

  return (
    <div className="flex justify-between py-[51px] px-[45px] text-4xl font-extrabold text-white bg-headerBlue">
      <h1>My Scheduler</h1>
      <div className="text-base">
        {user ? (
          <div className="flex">
            <button onClick={handleLogout} className="underline">
              Log out
            </button>
            <IconButton
              icon={profileIcon}
              size="md"
              onClick={() => router.push(`/mypage/${user.uid}`)}
              alt="profile icon"
            />
          </div>
        ) : (
          <button onClick={handleLogin}>Log in</button>
        )}
      </div>
    </div>
  );
}
