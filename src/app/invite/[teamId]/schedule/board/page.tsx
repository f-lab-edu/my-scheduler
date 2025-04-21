import Board from "@/app/[teamId]/schedule/[tab]/board/Board";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ teamId: string }>;
}

export default async function BoardPage({ params }: Props) {
  const { teamId } = await params;
  try {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_URL
        : process.env.NEXT_PUBLIC_DEV_URL;

    const response = await fetch(`${baseUrl}/api/teams/${teamId}`, {
      cache: "no-store",
    });

    if (!response.ok) throw new Error(`fetch 실패: ${response.status}`);

    const team = await response.json();
    return <Board team={team} canEdit />;
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
