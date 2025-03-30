import Contents from "@/app/schedule/contents/Contents";
import { ContentsProvider } from "@/app/schedule/contents/ContentsContext";
import InteractionBar from "@/app/schedule/interactionBar/InteractionBar";
import Tabs from "@/app/schedule/tabs/Tabs";
import {
  createNewTask,
  updateTask,
  deleteTask,
} from "@/app/schedule/contents/actions/TaskActions";

export default function Page() {
  return (
    <h1>
      <ContentsProvider
        onCreateNewTask={createNewTask}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      >
        <Tabs />
        <InteractionBar />
        <Contents />
      </ContentsProvider>
    </h1>
  );
}
