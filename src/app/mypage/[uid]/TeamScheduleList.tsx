"use client";
import { useEffect, useState } from "react";
import AddNewButton from "@/components/common/button/AddNewButton";
import TeamScheduleCard from "./TeamScheduleCard";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/common/Modal";
import InviteMember from "@/components/common/InviteMember";
import { getMyTeams, TeamType } from "@/lib/api/teams";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function TeamScheduleList() {
  const [teams, setTeams] = useState<TeamType[]>([]);
  const { open, closeModal, openModal } = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getMyTeams();
        setTeams(data);
      } catch (error: any) {
        // TODO: error 알럿으로 처리
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="pt-16 px-8">
      <AddNewButton type="team" onClick={openModal} />
      {teams.map((team, index) => (
        <TeamScheduleCard
          key={`${team.id}-${index}`}
          teamName={team.teamName}
          members={team.members}
        />
      ))}

      {open && (
        <Modal onClose={closeModal}>
          <InviteMember onClose={closeModal} />
        </Modal>
      )}
      {error && <div>TODO: 임시 에러{error}</div>}
      {isLoading && <LoadingSpinner />}
    </div>
  );
}
