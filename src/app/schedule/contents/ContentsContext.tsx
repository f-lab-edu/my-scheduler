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

interface Props {
  taskList: TaskType[];
  setTaskList: Dispatch<SetStateAction<TaskType[]>>;
  statusList: StatusType[];
  setStatusList: Dispatch<SetStateAction<StatusType[]>>;
  searchValue: string;
  setSearchValue: (value: string) => void;
  isAddStatusVisible: boolean;
  setIsAddStatusVisible: (visible: boolean) => void;
  filterList: Priority[];
  setFilterList: (filters: Priority[]) => void;
  onCreateNewTask: (task: TaskType) => Promise<string>;
  onUpdateTask: (task: TaskType) => Promise<void>;
}

interface ContentsProviderProps {
  children: ReactNode;
  onCreateNewTask: (task: TaskType) => Promise<string>;
  onUpdateTask: (task: TaskType) => Promise<void>;
}

const ContentsContext = createContext<Props | null>(null);

export function ContentsProvider({
  children,
  onCreateNewTask,
  onUpdateTask,
}: ContentsProviderProps) {
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [statusList, setStatusList] = useState<StatusType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isAddStatusVisible, setIsAddStatusVisible] = useState(false);
  const [filterList, setFilterList] = useState<Priority[]>([]);

  return (
    <ContentsContext.Provider
      value={{
        taskList,
        setTaskList,
        statusList,
        setStatusList,
        searchValue,
        setSearchValue,
        isAddStatusVisible,
        setIsAddStatusVisible,
        filterList,
        setFilterList,
        onCreateNewTask,
        onUpdateTask,
      }}
    >
      {children}
    </ContentsContext.Provider>
  );
}

export function useContentsContext() {
  const context = useContext(ContentsContext);
  if (!context)
    throw new Error("useContentsContext는 ContentsProvider 안에서 사용해야함");
  return context;
}
