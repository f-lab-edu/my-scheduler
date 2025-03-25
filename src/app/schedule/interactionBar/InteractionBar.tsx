"use client";
import SearchBar from "@/app/schedule/interactionBar/SearchBar";
import AddColumnButton from "@/components/common/button/AddColumnButton";
import FilterButton from "@/components/common/button/FilterButtons";

export default function InteractionBar() {
  return (
    <div className="flex items-center justify-between py-5 px-[70px]">
      <span className="flex items-center gap-3">
        <span className="flex gap-[3px] text-white text-xl">
          {/* TODO: count 동적으로 */}
          <span>3</span>
          <span>tasks</span>
        </span>
        <AddColumnButton />
      </span>
      <span className="flex items-center gap-3">
        <SearchBar />
        <FilterButton />
      </span>
    </div>
  );
}
