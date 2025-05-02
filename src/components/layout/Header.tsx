"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import IconButton from "@/components/common/button/IconButton";
import profileIcon from "@/assets/person-circle.svg";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (isLoggingOut) return;
      if (isLoggingIn) {
        if (u) {
          setUser(u);
          setIsLoggingIn(false);
        }
        return;
      }
      setUser(u);
    });
    return () => unsubscribe();
  }, [isLoggingOut, isLoggingIn]);

  const handleLogin = () => {
    router.push("/auth/login");
    setIsLoggingIn(true);
  };

  const handleLogout = async () => {
    if (!auth) return;
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      await router.push("/auth/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex justify-between py-[51px] px-[45px] text-4xl font-extrabold text-white bg-headerBlue">
      <h1>My Scheduler</h1>
      <div className="text-base">
        {user && (
          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="underline text-sm font-extralight"
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Logging out..." : "Log out"}
            </button>
            <IconButton
              icon={profileIcon}
              size="md"
              onClick={async () => await router.push(`/mypage/${user.uid}`)}
              alt="profile icon"
            />
          </div>
        )}
        {!user && params.auth !== "login" && (
          <button
            onClick={handleLogin}
            className="underline text-sm font-extralight"
          >
            Log in
          </button>
        )}
      </div>
    </div>
  );
}
