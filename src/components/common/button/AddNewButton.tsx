"use client";
import PlusIcon from "@/assets/plus.svg";

type Button = "board" | "team";
interface Props {
  onClick: () => void;
  type?: Button;
}

export default function AddNewButton({ onClick, type = "board" }: Props) {
  return (
    <button
      className={`flex items-center gap-1 p-3 hover:bg-hover-add focus:outline-none ${
        type === "board" ? "bg-button-add" : "bg-button-create"
      } text-white rounded-[10px]`}
      onClick={onClick}
    >
      <PlusIcon />
      <span>{type === "board" ? "Add New Status" : "Create New"}</span>
    </button>
  );
}
