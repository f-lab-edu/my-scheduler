"use client";
import AddNewButton from "@/components/common/button/AddNewButton";
import TeamScheduleCard from "./TeamScheduleCard";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/common/Modal";
import InviteMember from "@/components/common/InviteMember";

export default function TeamScheduleList() {
  const { open, closeModal, openModal } = useModal();
  return (
    <div className="pt-16 px-8">
      <AddNewButton type="team" onClick={openModal} />
      <TeamScheduleCard
        teamName="우리팀"
        members={[{ name: "홍길동", id: "zzyfzZi6rkVGnlXAyrfuK5KEeeH2" }]}
      />

      {open && (
        <Modal onClose={closeModal}>
          <InviteMember onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
