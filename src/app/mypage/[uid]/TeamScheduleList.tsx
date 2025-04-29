"use client";
import { useEffect, useState } from "react";
import AddNewButton from "@/components/common/button/AddNewButton";
import TeamScheduleCard from "@/app/mypage/[uid]/TeamScheduleCard";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/common/Modal";
import InviteMember from "@/components/common/InviteMember";
import { getMyTeams, TeamType } from "@/lib/api/teams";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ConfirmDialog from "@/components/common/ConfirmDialog";

export default function TeamScheduleList() {
  const [teams, setTeams] = useState<TeamType[]>([]);
  const { open, closeModal, openModal } = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getMyTeams();
        setTeams(data);
      } catch (error: any) {
        setIsErrorDialogOpen(true);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="pt-16 px-8">
      <AddNewButton type="team" onClick={openModal} />
      {teams.map((team) => (
        <TeamScheduleCard
          key={team.id}
          teamName={team.teamName}
          teamId={team.id}
          members={team.members}
        />
      ))}

      {open && (
        <Modal onClose={closeModal}>
          <InviteMember onClose={closeModal} />
        </Modal>
      )}

      {isErrorDialogOpen && (
        <ConfirmDialog
          onClose={() => setIsErrorDialogOpen(false)}
          contentText={error}
          closeText="Confirm"
        />
      )}

      {isLoading && <LoadingSpinner />}
    </div>
  );
}
