import { redirect } from "next/navigation";
import "@/lib/firebase";
import { getSessionUid } from "@/lib/server/auth";
import Home from "@/app/home/Home";
export default async function Page() {
  const uid = await getSessionUid();
  if (uid) redirect(`/mypage/${uid}`);

  return <Home />;
}
