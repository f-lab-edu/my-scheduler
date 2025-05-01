"use client";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import debounce from "lodash.debounce";
import { useContentsContext } from "@/app/[teamId]/schedule/contents/ContentsContext";
import SearchIcon from "@/assets/search.svg";

export default function SearchBar() {
  const { setSearchValue } = useContentsContext();
  const [inputValue, setInputValue] = useState("");

  const debouncedRef = useRef(debounce((value) => setSearchValue(value), 300));

  useEffect(() => {
    return () => {
      debouncedRef.current.cancel();
    };
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    debouncedRef.current(value);
    setInputValue(value);
  };

  return (
    <div className="flex items-center py-4 px-[18px] gap-2 border-2 border-solid border-border-search rounded-full bg-background-searchBar">
      <SearchIcon />
      <input
        className="bg-transparent outline-none text-white"
        placeholder="Type your task"
        onChange={handleInputChange}
        value={inputValue}
      />
    </div>
  );
}
