import FilterIcon from "@/assets/funnel.svg";

export default function FilterButton() {
  return (
    <button className="flex items-center gap-1 p-3 hover:bg-hover-filter focus:outline-none bg-button-filter text-font-filter rounded-[20px]">
      <FilterIcon />
      Filters
    </button>
  );
}
