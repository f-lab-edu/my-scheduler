"use client";
import Link from "next/link";
import BasicProfile from "@/components/common/BasicProfile";
import { MemberType } from "@/types/teamType";

interface Props {
  teamName: string;
  teamId: string;
  members: MemberType[];
}

export default function TeamScheduleCard({ teamName, teamId, members }: Props) {
  const MAX_PROFILE_LENGTH = 3;

  return (
    <Link
      className="inline-block mt-4 mr-4 rounded-xl w-[308px] h-[192px] bg-white"
      href={`/${teamId}/schedule/board`}
    >
      <div className="h-[136px] bg-background-lightGray rounded-tl-xl rounded-tr-xl"></div>
      <div className="flex justify-between p-3">
        <strong>{teamName}</strong>
        <div className="flex">
          {members.slice(0, MAX_PROFILE_LENGTH).map((member) => (
            <div key={member.uid}>
              <BasicProfile userId={member.name} />
            </div>
          ))}
          {members.length > MAX_PROFILE_LENGTH
            ? `+ ${members.length - MAX_PROFILE_LENGTH}`
            : ""}
        </div>
      </div>
    </Link>
  );
}
