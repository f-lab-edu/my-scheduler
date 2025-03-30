export type DateField = "start" | "end";
export type Priority = "High" | "Medium" | "Low";

export interface StatusType {
  id?: string;
  statusName: string;
  count: number;
  taskList: TaskType[];
}

export interface TaskType {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  priority: Priority;
  description: string;
  months?: number[]; //calendar 달별로 가져올 때
  order?: number; //drag&drop 순서
  statusId: string;
}

export interface TaskFormType {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  priority: Priority;
  description: string;
  statusId: string;
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
