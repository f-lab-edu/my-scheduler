import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";
import { redirect } from "next/navigation";
import "@/lib/firebase";
import Home from "@/app/home/Home";
export default async function Page() {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get("session")?.value;

  if (sessionCookie) {
    const decodedToken = await getAuth()
      .verifySessionCookie(sessionCookie)
      .catch((error) => {
        console.error("세션 검증 실패:", error);
        return null;
      });
    if (decodedToken) {
      redirect(`/mypage/${decodedToken.uid}`);
    }
  }
  return <Home />;
}
