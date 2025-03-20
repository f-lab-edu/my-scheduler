import SearchBar from "./SearchInput";

export default function InteractionBar() {
  return (
    <div className="flex items-center py-5 px-14">
      <span className="flex gap-[3px] text-white text-xl">
        {/* TODO: count 동적으로 */}
        <span>3</span>
        <span>tasks</span>
      </span>
      <SearchBar />
    </div>
  );
}
