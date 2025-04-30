"use client";
import { useParams } from "next/navigation";
import SearchBar from "@/app/[teamId]/schedule/interactionBar/SearchBar";
import AddNewButton from "@/components/common/button/AddNewButton";
import FilterButton from "@/components/common/button/FilterButtons";
import { useContentsContext } from "@/app/[teamId]/schedule/contents/ContentsContext";
import IconButton from "@/components/common/button/IconButton";
import personIcon from "@/assets/people.svg";

export default function InteractionBar() {
  const { tab } = useParams();

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
        {tab === "board" && (
          <AddNewButton onClick={handleChangeAddStatusInput} />
        )}
        <div className="relative flex w-11 h-11 rounded-lg bg-background-lightGray  hover:bg-background-extraLightGray">
          <IconButton
            icon={personIcon}
            onClick={() => {}}
            alt="member invitation icon"
          />
          <span className="absolute top-[5px] left-[30px]">+</span>
        </div>
      </span>
      <span className="flex items-center gap-3">
        <SearchBar />
        <FilterButton />
      </span>
    </div>
  );
}
