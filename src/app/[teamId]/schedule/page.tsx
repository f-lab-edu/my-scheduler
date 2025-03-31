import { ContentsProvider } from "@/app/[teamId]/schedule/contents/ContentsContext";
import InteractionBar from "@/app/[teamId]/schedule/interactionBar/InteractionBar";
import Tabs from "@/app/[teamId]/schedule/tabs/Tabs";
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
import Board from "./contents/board/Board";

export default async function Page() {
  const statusData = await getStatusList();
  const taskData = await getTaskList();
  return (
    <h1>
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
        <Board />
      </ContentsProvider>
    </h1>
  );
}
