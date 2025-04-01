import { redirect } from "next/navigation";
interface Props {
  params: { teamId: string };
}

export default async function SchedulePage({ params }: Props) {
  redirect(`/${params.teamId}/schedule/board`);
  return null;
}
