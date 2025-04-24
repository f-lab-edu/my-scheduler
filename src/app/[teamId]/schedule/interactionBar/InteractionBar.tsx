"use client";
import SearchBar from "@/app/[teamId]/schedule/interactionBar/SearchBar";
import AddNewButton from "@/components/common/button/AddNewButton";
import FilterButton from "@/components/common/button/FilterButtons";
import { useContentsContext } from "@/app/[teamId]/schedule/contents/ContentsContext";

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
        <AddNewButton onClick={handleChangeAddStatusInput} />
      </span>
      <span className="flex items-center gap-3">
        <SearchBar />
        <FilterButton />
      </span>
    </div>
  );
}
