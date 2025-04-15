import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";
import { notFound } from "next/navigation";

export interface PageProps {
  params: Promise<{ uid: string }>;
}

export default async function MyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { uid } = resolvedParams;

  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get("session")?.value;

  if (!sessionCookie) {
    notFound();
  }

  let decodedToken;
  try {
    decodedToken = await getAuth().verifySessionCookie(sessionCookie, true);
  } catch (error) {
    console.log(error);
    notFound();
  }

  if (decodedToken.uid !== uid) {
    notFound();
  }

  return (
    <div>
      <h1>My Page for {decodedToken.uid}</h1>
      <h2>Your Schedules</h2>
      {/* TODO: UI 렌더링 */}
    </div>
  );
}
