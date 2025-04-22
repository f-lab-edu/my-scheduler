import { TaskType } from "@/types/scheduleType";

export async function getTasks(teamId: string): Promise<TaskType[]> {
  try {
    const response = await fetch(`/api/teams/${teamId}/tasks`);
    if (!response.ok) {
      const errJson = await response.json();
      throw new Error(errJson.error || "작업 로드 실패");
    }
    return (await response.json()) as TaskType[];
  } catch (error: any) {
    throw new Error(error.message || "알 수 없는 오류");
  }
}
export async function createNewTask(
  teamId: string,
  task: Omit<TaskType, "id">
): Promise<string> {
  try {
    const response = await fetch(`/api/teams/${teamId}/tasks`, {
      method: "POST",
      body: JSON.stringify(task),
    });
    const json = await response.json();
    return json.id;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
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
