import { redirect } from "next/navigation";
import { getSessionUid } from "@/lib/server/auth";
import TeamScheduleList from "@/app/mypage/[uid]/TeamScheduleList";

export default async function MyPage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;
  const sessionUid = await getSessionUid();

  if (!sessionUid || sessionUid !== uid) {
    redirect("/unauthorized");
  }

  return <TeamScheduleList />;
}
