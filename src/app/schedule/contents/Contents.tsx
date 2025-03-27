import { getStatusList } from "@/lib/getStatusData";
import Board from "@/app/schedule/contents/board/Board";
import { handleCreateNewStatus } from "@/app/schedule/contents/StatusActions";
export default async function Contents() {
  const data = await getStatusList();

  return (
    <div>
      <Board onCreateNewStatus={handleCreateNewStatus} status={data} />
    </div>
  );
}
