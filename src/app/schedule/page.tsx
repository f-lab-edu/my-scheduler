import { ContentsProvider } from "@/app/schedule/contents/ContentsContext";
import InteractionBar from "@/app/schedule/interactionBar/InteractionBar";
import Tabs from "@/app/schedule/tabs/Tabs";
import {
  createNewTask,
  updateTask,
  deleteTask,
} from "@/app/schedule/contents/actions/TaskActions";
import {
  createNewStatus,
  deleteStatus,
} from "@/app/schedule/contents/actions/StatusActions";
import { getStatusList } from "@/app/schedule/contents/StatusService";
import { getTaskList } from "@/app/schedule/contents/TaskService";
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
