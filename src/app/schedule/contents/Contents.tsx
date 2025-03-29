import Board from "@/app/schedule/contents/board/Board";
import { handleCreateNewStatus } from "@/app/schedule/contents/StatusActions";

export default function Contents() {
  return (
    <div>
      <Board onCreateNewStatus={handleCreateNewStatus} />
    </div>
  );
}
