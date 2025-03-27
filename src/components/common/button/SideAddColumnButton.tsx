"use client";
import PlusIcon from "@/assets/plus.svg";

interface Props {
  onClick: () => void;
}

export default function SideAddColumnButton({ onClick }: Props) {
  return (
    <button
      className="hover:bg-headerBlue p-2 rounded-lg min-w-[184px] w-[184px]"
      onClick={onClick}
    >
      <PlusIcon width={24} height={24} />
    </button>
  );
}
