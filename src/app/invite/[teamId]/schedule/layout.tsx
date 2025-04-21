import { ReactNode } from "react";
import { TabsProvider } from "@/app/[teamId]/schedule/tabs/TabsContext";
import { ContentsProvider } from "@/app/[teamId]/schedule/contents/ContentsContext";
import Tabs from "@/app/[teamId]/schedule/tabs/Tabs";
import InteractionBar from "@/app/[teamId]/schedule/interactionBar/InteractionBar";
import {
  createNewTask,
  updateTask,
  deleteTask,
} from "@/app/[teamId]/schedule/contents/actions/TaskActions";
import {
  createNewStatus,
  deleteStatus,
} from "@/app/[teamId]/schedule/contents/actions/StatusActions";
import { getStatusList } from "@/app/[teamId]/schedule/contents/StatusService";
import { getTaskList } from "@/app/[teamId]/schedule/contents/TaskService";

type Props = {
  children: ReactNode;
  params: { teamId: string };
};

export default async function InviteScheduleLayout({
  children,
  params: { teamId },
}: Props) {
  const statusData = await getStatusList();
  const taskData = await getTaskList();

  return (
    <TabsProvider>
      <ContentsProvider
        onCreateNewStatus={createNewStatus}
        onDeleteStatus={deleteStatus}
        onCreateNewTask={createNewTask}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
        initialStatusList={statusData}
        initialTaskList={taskData}
      >
        <Tabs />
        <InteractionBar />
        <main>{children}</main>
      </ContentsProvider>
    </TabsProvider>
  );
}
