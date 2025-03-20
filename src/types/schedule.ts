export type DateField = "start" | "end";
export type Priority = "High" | "Medium" | "Low";

export type TaskForm = {
  title: string;
  startDate: string;
  endDate: string;
  priority: Priority;
  description: string;
};

export type TaskFormStatus = {
  success: boolean;
  message: string;
  newTask?: {
    title: string;
    startDate: string;
    endDate: string;
    priority: string;
    description: string;
  };
};
