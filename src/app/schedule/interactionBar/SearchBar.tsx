import Image from "next/image";
import searchIcon from "@/assets/search.svg";

export default function SearchBar() {
  return (
    <div className="flex py-4 px-[18px] gap-2 border-2 border-solid border-border-search rounded-full bg-background-searchBar">
      <Image src={searchIcon} alt="search icon" />
      <input
        className="bg-transparent outline-none text-white"
        placeholder="Type your task"
      />
    </div>
  );
}
