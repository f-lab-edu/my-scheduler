import { StatusType } from "@/types/scheduleType";

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
