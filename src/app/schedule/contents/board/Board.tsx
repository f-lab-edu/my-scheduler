"use client";

import { useEffect } from "react";
import StatusList from "@/app/schedule/contents/board/StatusList";
import { useContentsContext } from "@/app/schedule/contents/ContentsContext";
import SideAddColumnButton from "@/components/common/button/SideAddColumnButton";
import AddStatusInput from "@/components/common/AddStatusInput";
import { StatusType } from "@/types/scheduleType";

interface StatusProps {
  status: StatusType;
}

interface Props {
  onCreateNewStatus: (status: StatusProps) => Promise<string>;
  onDeleteStatus: (id: string) => Promise<void>;
  status: StatusType[];
}

export default function Board({
  onCreateNewStatus,
  onDeleteStatus,
  status,
}: Props) {
  const {
    statusList,
    setStatusList,
    isAddStatusVisible,
    setIsAddStatusVisible,
  } = useContentsContext();
  const handleAddStatusInputVisibility = () => {
    setIsAddStatusVisible(!isAddStatusVisible);
  };

  useEffect(() => {
    setStatusList(status);
    console.log("🟢", status);
  }, [status]);

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
          <StatusList
            key={`${status.statusName}-${index}`}
            status={status}
            onDeleteStatus={onDeleteStatus}
          />
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
