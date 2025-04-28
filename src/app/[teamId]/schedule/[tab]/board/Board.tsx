"use client";

import StatusList from "@/app/[teamId]/schedule/[tab]/board/StatusList";
import { useContentsContext } from "@/app/[teamId]/schedule/contents/ContentsContext";
import SideAddColumnButton from "@/components/common/button/SideAddColumnButton";
import AddStatusInput from "@/components/common/AddStatusInput";
import { StatusType } from "@/types/scheduleType";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useState } from "react";

export default function Board() {
  const {
    statusList,
    isAddStatusVisible,
    setIsAddStatusVisible,
    onDeleteStatus,
    onCreateNewStatus,
  } = useContentsContext();

  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAddStatusInputVisibility = () => {
    setIsAddStatusVisible(!isAddStatusVisible);
  };

  const handleSaveStatus = async (newStatusData: StatusType) => {
    try {
      await onCreateNewStatus(newStatusData);
    } catch (error: any) {
      setIsErrorDialogOpen(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex px-[70px] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500">
      <section className="flex gap-4 h-full">
        {statusList.map((status, index) => (
          <StatusList
            key={`${status.statusName}-${index}`}
            status={status}
            onDeleteStatus={onDeleteStatus}
          />
        ))}
      </section>
      <section className="flex justify-center py-5 px-3 w-[184px] ml-4 rounded-xl min-w-[250px] h-full bg-background-status">
        {isAddStatusVisible ? (
          <AddStatusInput
            onClick={handleAddStatusInputVisibility}
            onSave={handleSaveStatus}
          />
        ) : (
          <SideAddColumnButton onClick={handleAddStatusInputVisibility} />
        )}
      </section>

      {isErrorDialogOpen && (
        <ConfirmDialog
          onClose={() => setIsErrorDialogOpen(false)}
          contentText={errorMessage}
          closeText="Confirm"
        />
      )}
    </div>
  );
}
