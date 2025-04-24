"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Priority, StatusType, TaskType } from "@/types/scheduleType";

interface ContentsContextProps {
  taskList: TaskType[];
  setTaskList: Dispatch<SetStateAction<TaskType[]>>;
  statusList: StatusType[];
  searchValue: string;
  setSearchValue: (value: string) => void;
  isAddStatusVisible: boolean;
  setIsAddStatusVisible: (visible: boolean) => void;
  filterList: Priority[];
  setFilterList: (filters: Priority[]) => void;
  onCreateNewStatus: (status: StatusType) => Promise<string>;
  onDeleteStatus: (id: string) => Promise<void>;
  onCreateNewTask: (task: TaskType) => Promise<string>;
  onUpdateTask: (task: TaskType) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
}

interface ContentsProviderProps {
  children: ReactNode;
  initialStatusList: StatusType[];
  initialTaskList: TaskType[];
  onCreateNewStatus: (status: StatusType) => Promise<string>;
  onDeleteStatus: (id: string) => Promise<void>;
  onCreateNewTask: (task: TaskType) => Promise<string>;
  onUpdateTask: (task: TaskType) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
}

const ContentsContext = createContext<ContentsContextProps | null>(null);

export function ContentsProvider({
  children,
  initialStatusList,
  initialTaskList,
  onCreateNewStatus,
  onDeleteStatus,
  onCreateNewTask,
  onUpdateTask,
  onDeleteTask,
}: ContentsProviderProps) {
  const [statusList, setStatusList] = useState<StatusType[]>(initialStatusList);
  const [taskList, setTaskList] = useState<TaskType[]>(initialTaskList);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isAddStatusVisible, setIsAddStatusVisible] = useState<boolean>(false);
  const [filterList, setFilterList] = useState<Priority[]>([]);

  const handleCreateStatus = async (status: StatusType) => {
    const id = await onCreateNewStatus(status);
    setStatusList((prev) => [...prev, { ...status, id }]);
    return id;
  };

  const handleDeleteStatus = async (id: string) => {
    await onDeleteStatus(id);
    setStatusList((prev) => prev.filter((status) => status.id !== id));
  };

  const handleCreateTask = async (task: TaskType) => {
    const id = await onCreateNewTask(task);
    setTaskList((prev) => [...prev, { ...task, id }]);
    return id;
  };

  const handleUpdateTask = async (task: TaskType) => {
    await onUpdateTask(task);
    setTaskList((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  };

  const handleDeleteTask = async (id: string) => {
    await onDeleteTask(id);
    setTaskList((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <ContentsContext.Provider
      value={{
        taskList,
        setTaskList,
        statusList,
        searchValue,
        setSearchValue,
        isAddStatusVisible,
        setIsAddStatusVisible,
        filterList,
        setFilterList,
        onCreateNewStatus: handleCreateStatus,
        onDeleteStatus: handleDeleteStatus,
        onCreateNewTask: handleCreateTask,
        onUpdateTask: handleUpdateTask,
        onDeleteTask: handleDeleteTask,
      }}
    >
      {children}
    </ContentsContext.Provider>
  );
}

export function useContentsContext() {
  const context = useContext(ContentsContext);
  if (!context) {
    throw new Error(
      "useContentsContext는 ContentsProvider 안에서 사용해야 합니다."
    );
  }
  return context;
}
