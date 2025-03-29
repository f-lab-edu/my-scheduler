"use client";

import StatusList from "@/app/schedule/contents/board/StatusList";
import { StatusType } from "@/types/scheduleType";
import SideAddColumnButton from "@/components/common/button/SideAddColumnButton";
import AddStatusInput from "@/components/common/AddStatusInput";
import { useContentsContext } from "../ContentsContext";

interface StatusProps {
  status: StatusType;
}

interface Props {
  onCreateNewStatus: (status: StatusProps) => Promise<string>;
}

export default function Board({ onCreateNewStatus }: Props) {
  const {
    statusList,
    setStatusList,
    isAddStatusVisible,
    setIsAddStatusVisible,
  } = useContentsContext();
  const handleAddStatusInputVisibility = () => {
    setIsAddStatusVisible(!isAddStatusVisible);
  };

  const handleSaveStatus = async (newStatusData: StatusType) => {
    try {
      const docId = await onCreateNewStatus({ status: newStatusData });
      setStatusList((prev) => [...prev, { ...newStatusData, statusId: docId }]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="flex px-[70px] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500">
      <section className="flex gap-4 h-full">
        {statusList.map((status, index) => (
          <StatusList key={`${status.statusName}-${index}`} status={status} />
        ))}
      </section>
      <section className="flex justify-center py-5 px-3 w-[250px] ml-4 rounded-xl m-w-[150px] h-full bg-background-status">
        {!isAddStatusVisible && (
          <SideAddColumnButton onClick={handleAddStatusInputVisibility} />
        )}
        {isAddStatusVisible && (
          <AddStatusInput
            onClick={handleAddStatusInputVisibility}
            onSave={handleSaveStatus}
          />
        )}
      </section>
    </div>
  );
}
