import Board from "@/app/[teamId]/schedule/[tab]/board/Board";
import Calendar from "@/app/[teamId]/schedule/[tab]/calendar/Calendar";
import { getSessionUid } from "@/lib/server/auth";
import { notFound, redirect } from "next/navigation";
interface Props {
  params: Promise<{ tab?: string }>;
}

export default async function TabPage({ params }: Props) {
  const { tab } = await params;

  const uid = await getSessionUid();
  if (!uid) redirect("/unauthorized");

  if (tab === "board") {
    return <Board />;
  } else if (tab === "calendar") {
    return <Calendar />;
  } else {
    notFound();
  }
}
