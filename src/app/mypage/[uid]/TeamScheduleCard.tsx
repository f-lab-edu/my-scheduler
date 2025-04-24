"use client";

interface Props {
  teamName: string;
  members: string[];
}

export default function TeamScheduleCard({ teamName }: Props) {
  return (
    <div className="inline-block mt-4 mr-4 rounded-xl w-[308px] h-[192px] bg-white">
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
    </div>
  );
}
