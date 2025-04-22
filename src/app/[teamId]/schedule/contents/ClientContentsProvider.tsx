"use client";

import { ReactNode } from "react";
import { ContentsProvider } from "@/app/[teamId]/schedule/contents/ContentsContext";
import { createNewStatus, deleteStatus } from "@/lib/api/schedule/statusList";
import { createNewTask, updateTask, deleteTask } from "@/lib/api/schedule/task";
import { StatusType, TaskType } from "@/types/scheduleType";
import { TabsProvider } from "@/app/[teamId]/schedule/tabs/TabsContext";

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
  const handleCreateStatus = (status: StatusType) =>
    createNewStatus(teamId, status);
  const handleDeleteStatus = (id: string) => deleteStatus(teamId, id);

  const handleCreateTask = (task: TaskType) => createNewTask(teamId, task);
  const handleUpdateTask = (task: TaskType) => updateTask(teamId, task);
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
