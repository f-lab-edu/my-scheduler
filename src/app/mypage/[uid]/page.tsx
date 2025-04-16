import { redirect } from "next/navigation";
import { getSessionUid } from "@/lib/server/auth";
import TeamScheduleList from "./TeamScheduleList";

export default async function MyPage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const sessionUid = await getSessionUid();

  if (sessionUid !== uid) {
    redirect("/unauthorized");
  }

  return (
    <div>
      <h1>My Page for {sessionUid}</h1>
      <h2>Your Schedules</h2>
      {/* TODO: UI 렌더링 */}
      <TeamScheduleList />
    </div>
  );
}
