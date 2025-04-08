"use client";

import { TaskType } from "@/types/scheduleType";
interface Props {
  monthlyTasks?: TaskType[];
}

export default function Agenda({ monthlyTasks }: Props) {
  return (
    <aside className=" mt-[64px] rounded-lg w-[500px] min-w-[505px] h-full min-h-[200px] p-5 text-white bg-background-agendaBox">
      {monthlyTasks?.map((task, index) => (
        <div key={`${task}-${index}`}></div>
      ))}
    </aside>
  );
}
