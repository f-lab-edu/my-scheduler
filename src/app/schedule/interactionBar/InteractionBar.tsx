"use client";
import SearchBar from "@/app/schedule/interactionBar/SearchBar";
import AddColumnButton from "@/components/common/button/AddColumnButton";
import FilterButton from "@/components/common/button/FilterButtons";
import { useContentsContext } from "@/app/schedule/contents/ContentsContext";

export default function InteractionBar() {
  const { setIsAddStatusVisible, taskList } = useContentsContext();
  const handleChangeAddStatusInput = () => {
    setIsAddStatusVisible(true);
  };

  return (
    <div className="flex items-center justify-between py-5 px-[70px]">
      <span className="flex items-center gap-3">
        <span className="flex gap-[3px] text-white text-xl">
          <span>{taskList.length}</span>
          <span>tasks</span>
        </span>
        <AddColumnButton onClick={handleChangeAddStatusInput} />
      </span>
      <span className="flex items-center gap-3">
        <SearchBar />
        <FilterButton />
      </span>
    </div>
  );
}
