import PlusIcon from "@/assets/plus.svg";

export default function SideAddColumnButton() {
  return (
    <button className="flex justify-end py-5 px-3 w-96 ml-4 rounded-xl w-[150px] h-[64px] bg-background-status">
      <PlusIcon width={24} height={24} />
    </button>
  );
}
