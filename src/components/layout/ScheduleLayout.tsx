import { ReactNode } from "react";
import Tabs from "@/app/[teamId]/schedule/tabs/Tabs";
import InteractionBar from "@/components/common/interactionBar/InteractionBar";
import ClientContentsProvider from "@/app/[teamId]/schedule/contents/ClientContentsProvider";
import {
  fetchInitialStatusList,
  fetchInitialTaskList,
} from "@/lib/server/schedule";

export default async function ScheduleLayout({
  params,
  children,
}: {
  params: Promise<{ teamId: string }>;
  children: ReactNode;
}) {
  const { teamId } = await params;
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
