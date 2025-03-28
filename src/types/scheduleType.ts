export type DateField = "start" | "end";
export type Priority = "High" | "Medium" | "Low";

export interface StatusType {
  id?: string;
  statusName: string;
  count: number;
  taskList: TaskType[];
}

export interface TaskType {
  // id?: string; //TODO: 추후 확인 한 번 더 해보고 제거
  title: string;
  startDate: string;
  endDate: string;
  priority: Priority;
  description: string;
  statusId: string | null;
  taskId?: string; //수정 시에만 필요
  months?: number[]; //calendar 달별로 가져올 때
  order?: number; //drag&drop 순서
}

export interface TaskFormType {
  title: string;
  startDate: string;
  endDate: string;
  priority: Priority;
  description: string;
}

export interface TaskFormStatusType {
  success: boolean;
  message: string;
  newTask?: {
    title: string;
    startDate: string;
    endDate: string;
    priority: string;
    description: string;
  };
}
