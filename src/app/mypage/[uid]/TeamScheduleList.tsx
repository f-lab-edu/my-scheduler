"use client";
import { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { createTeam } from "@/lib/api/teams";
import { createInvitation } from "@/lib/api/invitation";
import Modal from "@/components/common/Modal";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import AddNewButton from "@/components/common/button/AddNewButton";
import InvitationForm from "@/components/common/invitation/InvitationForm";
import TeamScheduleCard from "@/app/mypage/[uid]/TeamScheduleCard";
import { TeamType } from "@/types/teamType";

interface Props {
  data: TeamType[];
}
export default function TeamScheduleList({ data }: Props) {
  const [teams, setTeams] = useState<TeamType[]>(data);
  const { open, closeModal, openModal } = useModal();

  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [error, setError] = useState<string>("");

  const handleCreateAndInvite = async (teamName: string, emails: string[]) => {
    const { teamId } = await createTeam(teamName);
    await createInvitation(teamId, emails);
    setTeams((prev) => {
      const newTeam = {
        id: teamId,
        teamName,
        members: [],
        createdAt: Date.now(),
      };
      return [...prev, newTeam].sort((a, b) => b.createdAt! - a.createdAt!);
    });
  };

  return (
    <div className="pt-16 px-8">
      <AddNewButton type="team" onClick={openModal} />
      {teams
        .sort((a, b) => b.createdAt! - a.createdAt!)
        .map((team) => {
          return (
            <TeamScheduleCard
              key={team.id}
              teamName={team.teamName}
              teamId={team.id}
              members={team.members}
            />
          );
        })}

      {open && (
        <Modal onClose={closeModal}>
          <InvitationForm
            onClose={closeModal}
            onSubmit={handleCreateAndInvite}
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
    </div>
  );
}
