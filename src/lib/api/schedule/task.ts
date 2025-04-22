import { TaskType } from "@/types/scheduleType";

export async function createNewTask(
  teamId: string,
  task: Omit<TaskType, "id">
): Promise<string> {
  const response = await fetch(`/api/teams/${teamId}/tasks`, {
    method: "POST",
    body: JSON.stringify(task),
  });
  const json = await response.json();
  return json.id;
}

export async function updateTask(
  teamId: string,
  task: TaskType
): Promise<void> {
  await fetch(`/api/teams/${teamId}/tasks`, {
    method: "PATCH",
    body: JSON.stringify(task),
  });
}

export async function deleteTask(teamId: string, id: string): Promise<void> {
  await fetch(`/api/teams/${teamId}/tasks`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
}
