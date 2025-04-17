"use client";
import Modal from "@/components/common/Modal";
import { useModal } from "@/hooks/useModal";
import { Member } from "@/types/teamType";

interface Props {
  teamName: string;
  members: Member[];
}

export default function TeamScheduleCard({ teamName, members }: Props) {
  const { open, closeModal, openModal } = useModal();
  return (
    <div className="mt-4 rounded-xl w-[308px] h-[192px] bg-white">
      <div className="h-[136px] bg-background-lightGray rounded-tl-xl rounded-tr-xl"></div>
      <div className="flex justify-between">
        <div>{teamName}</div>
        <div>
          {members.map((member, index) => (
            <span key={`${member.id}-${index}`}>
              {/* TODO: member icon, 3명 이상 icon 처리, 나머지 +n */}
            </span>
          ))}
        </div>
      </div>
      {open && <Modal onClose={closeModal}></Modal>}
    </div>
  );
}
