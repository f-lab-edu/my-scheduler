// import { ReactNode } from "react";
// import { TabsProvider } from "@/app/[teamId]/schedule/tabs/TabsContext";
// import { ContentsProvider } from "@/app/[teamId]/schedule/contents/ContentsContext";
// import Tabs from "@/app/[teamId]/schedule/tabs/Tabs";
// import InteractionBar from "@/app/[teamId]/schedule/interactionBar/InteractionBar";
// import {
//   createNewTask,
//   updateTask,
//   deleteTask,
// } from "@/app/[teamId]/schedule/contents/actions/TaskActions";
// import {
//   createNewStatus,
//   deleteStatus,
// } from "@/app/[teamId]/schedule/contents/actions/StatusActions";
// import { getStatusList } from "@/app/[teamId]/schedule/contents/StatusService";
// import { getTaskList } from "@/app/[teamId]/schedule/contents/TaskService";

// type Props = {
//   children: ReactNode;
//   params: Promise<{ teamId: string }>;
// };

// export default async function InviteScheduleLayout({
//   children,
//   params,
// }: Props) {
//   const statusData = await getStatusList();
//   const taskData = await getTaskList();
//   // TODO: teamId별로 처리
//   const { teamId } = await params;
//   console.log(teamId);
//   return (
//     <TabsProvider>
//       <ContentsProvider
//         onCreateNewStatus={createNewStatus}
//         onDeleteStatus={deleteStatus}
//         onCreateNewTask={createNewTask}
//         onUpdateTask={updateTask}
//         onDeleteTask={deleteTask}
//         initialStatusList={statusData}
//         initialTaskList={taskData}
//       >
//         <Tabs />
//         <InteractionBar />
//         <main>{children}</main>
//       </ContentsProvider>
//     </TabsProvider>
//   );
// }

// import { ReactNode } from "react";
// import { TabsProvider } from "@/app/[teamId]/schedule/tabs/TabsContext";
// import { ContentsProvider } from "@/app/[teamId]/schedule/contents/ContentsContext";
// import Tabs from "@/app/[teamId]/schedule/tabs/Tabs";
// import InteractionBar from "@/app/[teamId]/schedule/interactionBar/InteractionBar";
// import {
//   createNewStatus,
//   deleteStatus,
// } from "./contents/actions/StatusActions";
import { createNewTask, updateTask, deleteTask } from "@/lib/api/schedule/task";
import { createNewStatus, deleteStatus } from "@/lib/api/schedule/statusList";
// import {
//   createNewTask,
//   updateTask,
//   deleteTask,
// } from "@/app/[teamId]/schedule/contents/actions/TaskActions";
// import {
//   createNewStatus,
//   deleteStatus,
// } from "@/app/[teamId]/schedule/contents/actions/StatusActions";
// import { getStatusList } from "@/app/[teamId]/schedule/contents/StatusService";
// import { getTaskList } from "@/app/[teamId]/schedule/contents/TaskService";
import { ReactNode } from "react";
import Tabs from "@/app/[teamId]/schedule/tabs/Tabs";
import InteractionBar from "@/app/[teamId]/schedule/interactionBar/InteractionBar";
import ClientContentsProvider from "@/app/[teamId]/schedule/contents/ClientContentsProvider";

import {
  fetchInitialStatusList,
  fetchInitialTaskList,
} from "@/lib/server/schedule";

type Props = {
  params: { teamId: string };
  children: ReactNode;
};

export default async function ScheduleLayout({ params, children }: Props) {
  const { teamId } = params;
  const [statusData, taskData] = await Promise.all([
    fetchInitialStatusList(teamId),
    fetchInitialTaskList(teamId),
  ]);

  return (
    <ClientContentsProvider
      teamId={teamId}
      initialStatusList={statusData}
      initialTaskList={taskData}
    >
      <Tabs />
      <InteractionBar />
      <main>{children}</main>
    </ClientContentsProvider>
  );
}
