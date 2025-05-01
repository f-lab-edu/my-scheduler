"use client";
import { useParams } from "next/navigation";
import SearchBar from "@/components/common/interactionBar/SearchBar";
import AddNewButton from "@/components/common/button/AddNewButton";
import FilterButton from "@/components/common/button/FilterButtons";
import { useContentsContext } from "@/app/[teamId]/schedule/contents/ContentsContext";
import IconButton from "@/components/common/button/IconButton";
import personIcon from "@/assets/people.svg";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/common/Modal";
import InvitationForm from "@/components/common/invitation/InvitationForm";
import { createInvitation } from "@/lib/api/invitation";
import { useDropdownToggle } from "@/hooks/useDropdown";
import PriorityFilterDropdown from "@/components/dropdown/PriorityFilterDropdown";

export default function InteractionBar() {
  const { tab, teamId } = useParams();
  const { open, openModal, closeModal } = useModal();
  const { dropdownPosition, setDropdownPosition, toggleDropdown } =
    useDropdownToggle();

  const id = Array.isArray(teamId) ? teamId[0] : teamId!;

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
            onClick={() => openModal()}
            alt="member invitation icon"
          />
          <span className="absolute top-[5px] left-[30px]">+</span>
        </div>
      </span>
      <span className="flex items-center gap-3">
        <SearchBar />
        <FilterButton onClick={() => {}} />
      </span>

      {dropdownPosition && (
        <PriorityFilterDropdown
          top={dropdownPosition.top + 10}
          left={dropdownPosition.left}
          list={["Remove list"]}
          onClose={() => setDropdownPosition(null)}
        />
      )}

      {open && (
        <Modal onClose={closeModal}>
          <InvitationForm
            teamId={id}
            onClose={closeModal}
            onSubmit={async (_, emails) => {
              await createInvitation(id, emails);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
