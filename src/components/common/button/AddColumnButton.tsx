"use client";
import PlusIcon from "@/assets/plus.svg";

interface Props {
  onClick: () => void;
}

export default function AddColumnButton({ onClick }: Props) {
  return (
    <button
      className="flex items-center gap-1 p-3 hover:bg-hover-add focus:outline-none bg-button-add text-white rounded-[10px]"
      onClick={onClick}
    >
      <PlusIcon />
      <span>Add New Status</span>
    </button>
  );
}
