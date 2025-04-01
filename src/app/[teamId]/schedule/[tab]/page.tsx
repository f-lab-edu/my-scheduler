import Board from "@/app/[teamId]/schedule/[tab]/Board";
import Calendar from "@/app/[teamId]/schedule/[tab]/Calendar";
import { notFound } from "next/navigation";
interface Props {
  params: Promise<{ tab?: string }>;
}

export default async function TabPage({ params }: Props) {
  const { tab } = await params;

  if (tab === "board") {
    return <Board />;
  } else if (tab === "calendar") {
    return <Calendar />;
  } else {
    notFound();
  }
}
