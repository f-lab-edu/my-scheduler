"use server";
import { getSessionUid } from "@/lib/server/auth";
import { redirect } from "next/navigation";

export default async function SessionRedirect() {
  const uid = await getSessionUid();
  if (uid) redirect(`/mypage/${uid}`);
  return null;
}
