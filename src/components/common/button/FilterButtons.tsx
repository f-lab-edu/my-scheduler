"use client";

import { MouseEventHandler } from "react";
import FilterIcon from "@/assets/funnel.svg";
interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}
export default function FilterButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 p-3 hover:bg-hover-filter focus:outline-none bg-button-filter text-font-filter rounded-[20px]"
    >
      <FilterIcon />
      Filters
    </button>
  );
}
