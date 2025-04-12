import SearchIcon from "@/assets/search.svg";

export default function SearchBar() {
  return (
    <div className="flex items-center py-4 px-[18px] gap-2 border-2 border-solid border-border-search rounded-full bg-background-searchBar">
      <SearchIcon />
      <input
        className="bg-transparent outline-none text-white"
        placeholder="Type your task"
      />
    </div>
  );
}
