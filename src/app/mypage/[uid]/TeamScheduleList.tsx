"use client";
import { useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { getMyTeams } from "@/lib/api/teams";
import { createTeam } from "@/lib/api/teams";
import { createInvitation } from "@/lib/api/invitation";
import Modal from "@/components/common/Modal";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import AddNewButton from "@/components/common/button/AddNewButton";
import InvitationForm from "@/components/common/invitation/InvitationForm";
import TeamScheduleCard from "@/app/mypage/[uid]/TeamScheduleCard";
import { TeamType } from "@/types/teamType";

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
          <InvitationForm
            onClose={closeModal}
            onSubmit={async (teamName, emails) => {
              const { teamId } = await createTeam(teamName);
              await createInvitation(teamId, emails);
            }}
          />
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
