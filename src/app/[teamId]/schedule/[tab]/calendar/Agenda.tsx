"use client";

import { CalendarEventType } from "@/types/scheduleType";
import dayjs from "dayjs";
interface Props {
  tasks: CalendarEventType[];
  year: number;
  month: number;
}

export default function Agenda({ tasks, year, month }: Props) {
  const monthStart = dayjs(`${year}-${month + 1}-01`);
  const nextMonthStart = monthStart.add(1, "month");

  const filtered = tasks.filter((task) => {
    const taskStart = dayjs(task.start);
    const taskEnd = dayjs(task.end);

    return taskStart.isBefore(nextMonthStart) && taskEnd.isAfter(monthStart);
  });

  return (
    <aside className=" mt-[64px] rounded-lg w-[500px] min-w-[505px] h-full min-h-[200px] p-5 text-white bg-background-agendaBox">
      {filtered.length === 0 ? (
        <p>
          이벤트가 없습니다 {year}-{String(month).padStart(2, "0")}
        </p>
      ) : (
        filtered.map((task) => (
          <div key={task.id} className="flex gap-2 items-center">
            <div
              className="w-5 h-5 rounded-sm"
              style={{ backgroundColor: task.color }}
            />
            <div className="flex gap-2">
              <strong>{task.title}</strong>
              <div className="text-sm">
                <span>{task.start} → </span>
                <span></span>
                {dayjs(task.end).subtract(1, "day").format("YYYY-MM-DD")}
              </div>
            </div>
          </div>
        ))
      )}
    </aside>
  );
}
