import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";
import "@/lib/firebase";

export async function getSessionUid(): Promise<string | null> {
  const cookieStore = await cookies();
  const session = await cookieStore.get("session")?.value;
  if (!session) return null;
  try {
    const { uid } = await getAuth().verifySessionCookie(session, true);
    return uid;
  } catch (error: any) {
    console.error(error);
    return null;
  }
}
