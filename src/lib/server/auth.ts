import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";

export async function getSessionUid(): Promise<string | null> {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  try {
    const { uid } = await getAuth().verifySessionCookie(session, true);
    return uid;
  } catch {
    return null;
  }
}
