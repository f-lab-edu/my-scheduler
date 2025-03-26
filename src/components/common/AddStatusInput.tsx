"use client";

import { ChangeEvent, useState } from "react";
import ConfirmButton from "@/components/common/button/ConfirmButtons";

interface Props {
  onClick: () => void;
}
export default function AddStatusInput({ onClick }: Props) {
  const [value, setValue] = useState("");
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
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
        <ConfirmButton isSave={true} text="Save" size="sm" onClose={onClick} />
      </div>
    </div>
  );
}
