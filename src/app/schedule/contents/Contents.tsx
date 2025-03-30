import { getStatusList } from "@/app/schedule/contents/StatusService";
import {
  createNewStatus,
  deleteStatus,
} from "@/app/schedule/contents/actions/StatusActions";

import Board from "@/app/schedule/contents/board/Board";

export default async function Contents() {
  const statusData = await getStatusList();

  return (
    <div>
      <Board
        onCreateNewStatus={createNewStatus}
        onDeleteStatus={deleteStatus}
        status={statusData}
      />
    </div>
  );
}
