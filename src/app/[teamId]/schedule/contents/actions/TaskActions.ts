"use server";
import { TaskFormStatusType, Priority } from "@/types/scheduleType";

export async function TaskAction(
  state: TaskFormStatusType,
  payload: FormData
): Promise<TaskFormStatusType> {
  const title = payload.get("title")?.toString() || "";
  const startDate = payload.get("startDate")?.toString() || "";
  const endDate = payload.get("endDate")?.toString() || "";
  const priority = (payload.get("priority")?.toString() || "High") as Priority;
  const description = payload.get("description")?.toString() || "";

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (!title) {
    return {
      success: false,
      message: "제목은 필수입니다.",
    };
  } else if (!startDate) {
    return {
      success: false,
      message: "시작 날짜는 필수입니다.",
    };
  } else if (end < start) {
    return {
      success: false,
      message: "종료 날짜는 시작 날짜보다 이전일 수 없습니다.",
    };
  }

  const newTask = {
    title,
    startDate,
    endDate,
    priority,
    description,
  };

  return {
    success: true,
    message: "일정 생성 성공!!",
    newTask,
  };
}
