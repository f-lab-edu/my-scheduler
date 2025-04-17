import { notFound } from "next/navigation";
import { getSessionUid } from "@/lib/server/auth";

interface PageProps {
  params: { uid: string };
}

export default async function MyPage({ params }: PageProps) {
  const { uid } = params;
  const sessionUid = await getSessionUid();

  if (sessionUid !== uid) {
    notFound();
  }

  return (
    <div>
      <h1>My Page for {sessionUid}</h1>
      <h2>Your Schedules</h2>
      {/* TODO: UI 렌더링 */}
    </div>
  );
}
