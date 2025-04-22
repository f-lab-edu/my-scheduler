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
