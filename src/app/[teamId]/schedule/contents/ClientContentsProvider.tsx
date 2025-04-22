"use client";

import { ReactNode } from "react";
import { ContentsProvider } from "./ContentsContext";
import { createNewStatus, deleteStatus } from "@/lib/api/schedule/statusList";
import { createNewTask, updateTask, deleteTask } from "@/lib/api/schedule/task";
import { StatusType, TaskType } from "@/types/scheduleType";
import { TabsProvider } from "../tabs/TabsContext";

interface Props {
  teamId: string;
  initialStatusList: StatusType[];
  initialTaskList: TaskType[];
  children: ReactNode;
}

export default function ClientContentsProvider({
  teamId,
  initialStatusList,
  initialTaskList,
  children,
}: Props) {
  const handleCreateStatus = (s: StatusType) => createNewStatus(teamId, s);
  const handleDeleteStatus = (id: string) => deleteStatus(teamId, id);

  const handleCreateTask = (t: TaskType) => createNewTask(teamId, t);
  const handleUpdateTask = (t: TaskType) => updateTask(teamId, t);
  const handleDeleteTask = (id: string) => deleteTask(teamId, id);

  return (
    <TabsProvider>
      <ContentsProvider
        initialStatusList={initialStatusList}
        initialTaskList={initialTaskList}
        onCreateNewStatus={handleCreateStatus}
        onDeleteStatus={handleDeleteStatus}
        onCreateNewTask={handleCreateTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      >
        {children}
      </ContentsProvider>
    </TabsProvider>
  );
}
