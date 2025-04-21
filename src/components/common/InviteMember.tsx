"use client";

import { useState, ChangeEvent } from "react";
import ConfirmButton from "@/components/common/button/ConfirmButton";
import closeIcon from "@/assets/x.svg";
import IconButton from "./button/IconButton";

interface Props {
  onClose: () => void;
}

export default function InviteMember({ onClose }: Props) {
  const [inviteeEmail, setInviteeEmail] = useState("");
  const [teamName, setTeamName] = useState("");

  const handleTeamNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    setTeamName(event.target.value);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInviteeEmail(event.target.value);

  const handleSendEmail = async () => {
    try {
      const response = await fetch("/api/teams/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamName, inviteeEmail }),
      });
    } catch (error) {
      console.error(error);
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
          placeholder="Member inviteeEmail"
          className="border rounded-lg p-2 w-80 mr-2"
          value={inviteeEmail}
          onChange={handleEmailChange}
        />
        <ConfirmButton
          text="Invite"
          type="button"
          size="sm"
          onClick={handleSendEmail}
        />
      </div>
    </div>
  );
}
