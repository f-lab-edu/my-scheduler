import Board from "@/app/[teamId]/schedule/[tab]/board/Board";
import Calendar from "@/app/[teamId]/schedule/[tab]/calendar/Calendar";
import { notFound } from "next/navigation";
interface Props {
  params: Promise<{ tab?: string }>;
}

export default async function TabPage({ params }: Props) {
  const { tab } = await params;

  if (tab === "board") {
    // TODO: team 수정
    return <Board team={"test"} canEdit />;
  } else if (tab === "calendar") {
    return <Calendar />;
  } else {
    notFound();
  }
}
