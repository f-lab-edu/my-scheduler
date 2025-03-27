"use client";

import { ChangeEvent, useState } from "react";
import ConfirmButton from "@/components/common/button/ConfirmButtons";
import { StatusType } from "@/types/scheduleType";

interface Props {
  onClick: () => void;
  onSave: (status: StatusType) => void;
}
export default function AddStatusInput({ onClick, onSave }: Props) {
  const [value, setValue] = useState("");
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSaveStatus = () => {
    const newStatus: StatusType = {
      statusName: value,
      count: 0,
      taskList: [],
    };

    onSave(newStatus);
  };

  return (
    <div>
      <input
        className="p-3 rounded-lg h-[40px] outline-none"
        placeholder="Enter status name"
        value={value}
        onChange={handleInputChange}
      />
      <div className="flex justify-end gap-1 mt-2">
        <ConfirmButton
          isSave={false}
          text="Cancel"
          size="sm"
          onClose={onClick}
        />
        <ConfirmButton
          isSave={true}
          text="Save"
          size="sm"
          onClose={onClick}
          onSave={handleSaveStatus}
        />
      </div>
    </div>
  );
}
