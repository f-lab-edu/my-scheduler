"use client";

import { ChangeEvent, useState } from "react";
import ConfirmButton from "@/components/common/button/ConfirmButton";
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
    onClick();
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
          variant="cancel"
          text="Cancel"
          size="sm"
          onClick={onClick}
        />
        <ConfirmButton
          variant="confirm"
          text="Save"
          size="sm"
          onClick={handleSaveStatus}
        />
      </div>
    </div>
  );
}
