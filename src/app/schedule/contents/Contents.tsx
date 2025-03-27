import {
  getStatusList,
  createNewStatus,
  deleteStatus,
} from "@/app/schedule/contents/StatusService";
import Board from "@/app/schedule/contents/board/Board";

export default async function Contents() {
  const data = await getStatusList();

  return (
    <div>
      <Board
        onCreateNewStatus={createNewStatus}
        onDeleteStatus={deleteStatus}
        status={data}
      />
    </div>
  );
}
