import { redirect } from "next/navigation";

interface Props {
  params: { teamId: string };
}

export default async function SchedulePage({ params }: Props) {
  const { teamId } = await params;
  redirect(`/${teamId}/schedule/board`);
  return null;
}
