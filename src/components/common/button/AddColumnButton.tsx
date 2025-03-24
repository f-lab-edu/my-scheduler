import plusIcon from "@/assets/plus.svg";
import { useModal } from "@/hooks/useModal";
import Image from "next/image";
export default function AddColumnButton() {
  const { open, openModal, closeModal } = useModal();

  return (
    <button
      className="flex items-center gap-1 p-3 hover:bg-hover-add focus:outline-none bg-button-add text-white rounded-[10px]"
      onClick={openModal}
    >
      <Image width="24" height="24" src={plusIcon} alt="plus icon" />
      <span>Add New Status</span>
    </button>
  );
}
