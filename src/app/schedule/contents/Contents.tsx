import Board from "@/app/schedule/contents/board/Board";
import { getStatusList } from "@/app/schedule/contents/StatusService";
import { getTaskList } from "@/app/schedule/contents/TaskService";
import {
  createNewStatus,
  deleteStatus,
} from "@/app/schedule/contents/actions/StatusActions";

export default async function Contents() {
  const statusData = await getStatusList();
  const taskData = await getTaskList();

  return (
    <div>
      <Board
        onCreateNewStatus={createNewStatus}
        onDeleteStatus={deleteStatus}
        status={statusData}
        task={taskData}
      />
    </div>
  );
}
