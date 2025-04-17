"use client";
import AddNewButton from "@/components/common/button/AddNewButton";
import TeamScheduleCard from "./TeamScheduleCard";

export default function TeamScheduleList() {
  return (
    <div className="pt-16 px-8">
      <AddNewButton type="team" onClick={() => {}} />
      <TeamScheduleCard
        teamName="우리팀"
        members={[{ name: "홍길동", id: "zzyfzZi6rkVGnlXAyrfuK5KEeeH2" }]}
      />
    </div>
  );
}
