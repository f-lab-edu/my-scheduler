"use client";

import Link from "next/link";

interface Props {
  teamName: string;
  teamId: string;
  members: string[];
}

export default function TeamScheduleCard({ teamName, teamId }: Props) {
  return (
    <Link
      className="inline-block mt-4 mr-4 rounded-xl w-[308px] h-[192px] bg-white"
      href={`/${teamId}/schedule/board`}
    >
      <div className="h-[136px] bg-background-lightGray rounded-tl-xl rounded-tr-xl"></div>
      <div className="flex justify-between">
        <div>{teamName}</div>
        <div>
          {/* TODO: member 관련 정보 api 생성 + icon, 3명 이상 icon 처리, 나머지 +n */}
          {/* {members.map((member, index) => (
            <span key={`${member.id}-${index}`}>
            </span>
          ))} */}
        </div>
      </div>
    </Link>
  );
}
