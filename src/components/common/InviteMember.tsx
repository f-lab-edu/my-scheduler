"use client";

import { useState, ChangeEvent } from "react";
import ConfirmButton from "@/components/common/button/ConfirmButton";
import IconButton from "@/components/common/button/IconButton";
import closeIcon from "@/assets/x.svg";
import { createTeam } from "@/lib/api/teams";
import { createInvitation } from "@/lib/api/invitation";
import LoadingSpinner from "@/components/common/LoadingSpinner";


interface Props {
  onClose: () => void;
}

export default function InviteMember({ onClose }: Props) {
  const [teamName, setTeamName] = useState("");
  const [inviteeEmail, setInviteeEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTeamNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    setTeamName(event.target.value);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInviteeEmail(event.target.value);

  const handleSendInvite = async () => {
    if (teamName.trim().length === 0) {
      setError("팀 제목을 입력하세요.");
      return;
    }

    const emails = inviteeEmail
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    if (emails.length === 0) {
      setError("한 명 이상 초대 대상의 이메일을 쉼표로 구분해서 입력하세요.");
      return;
    }

    setIsLoading(true);
    try {
      // 팀 생성 -> 초대
      const { teamId } = await createTeam(teamName);
      await createInvitation(teamId, emails);
      onClose();
    } catch (error: any) {
      console.error(error);
      setError(error.message || "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 w-[600px] min-h-[300px] bg-white rounded-lg">
      <div className="flex justify-end">
        <IconButton icon={closeIcon} onClick={onClose} alt="close icon" />
      </div>
      <input
        name="Team Title"
        placeholder="New Title"
        className="border-b-2 border-border-editor w-[500px] h-[40px] text-2xl outline-none"
        value={teamName}
        onChange={handleTeamNameChange}
      />
      <div className="mt-4">
        <input
          placeholder="쉼표를 사용하여 이메일을 작성하세요"
          className="border rounded-lg p-2 w-80 mr-2"
          value={inviteeEmail}
          onChange={handleEmailChange}
        />
        <ConfirmButton
          text="Invite"
          type="button"
          size="sm"
          onClick={handleSendInvite}
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {isLoading && <LoadingSpinner />}
        />
      </div>
    </div>
  );
}
