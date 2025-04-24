import { StatusType } from "@/types/scheduleType";

export async function getStatuses(teamId: string): Promise<StatusType[]> {
  const response = await fetch(`/api/teams/${teamId}/statusList`);
  if (!response.ok) throw new Error("상태 목록 로드 실패");
  return (await response.json()) as StatusType[];
}

export async function createNewStatus(
  teamId: string,
  status: Omit<StatusType, "id">
): Promise<string> {
  const response = await fetch(`/api/teams/${teamId}/statusList`, {
    method: "POST",
    body: JSON.stringify(status),
  });
  const json = await response.json();
  return json.id;
}

export async function deleteStatus(teamId: string, id: string): Promise<void> {
  await fetch(`/api/teams/${teamId}/statusList`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
}
