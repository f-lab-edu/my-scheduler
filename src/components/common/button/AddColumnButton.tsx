"use client";
import PlusIcon from "@/assets/plus.svg";
export default function AddColumnButton() {
  return (
    <button className="flex items-center gap-1 p-3 hover:bg-hover-add focus:outline-none bg-button-add text-white rounded-[10px]">
      <PlusIcon />
      <span>Add New Status</span>
    </button>
  );
}
