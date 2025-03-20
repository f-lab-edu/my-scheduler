import CompoundButton from "@/components/common/button/CompoundButton";
import SearchBar from "@/app/schedule/interactionBar/SearchBar";
import plusIcon from "@/assets/plus.svg";

export default function InteractionBar() {
  return (
    <div className="flex items-center py-5 px-14">
      <span className="flex gap-[3px] text-white text-xl">
        {/* TODO: count 동적으로 */}
        <span>3</span>
        <span>tasks</span>
      </span>
      <CompoundButton variant="add">
        <CompoundButton.Icon icon={plusIcon} />
        <CompoundButton.Text text="Add New" />
      </CompoundButton>
      <SearchBar />
    </div>
  );
}
