"use client";
import PlusIcon from "@/assets/plus.svg";

interface Props {
  onClick: () => void;
}

export default function SideAddColumnButton({ onClick }: Props) {
  return (
    <button onClick={onClick}>
      <PlusIcon width={24} height={24} />
    </button>
  );
}
