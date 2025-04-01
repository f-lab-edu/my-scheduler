"use client";
import { MONTH_NAMES, WEEK } from "@/app/[teamId]/schedule/constants";
import PrevIcon from "@/assets/caret-left-fill.svg";
import NextIcon from "@/assets/caret-right-fill.svg";
import { Priority, TaskType } from "@/types/scheduleType";
import { useEffect, useState } from "react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthlyData, setMonthlyData] = useState<TaskType[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // const handle

  useEffect(() => {
    // refreshTasks();
  }, [year, month]);

  const firstDayOfMonth = new Date(year, month, 1); //첫 날의 요일
  const startDay = new Date(firstDayOfMonth);
  startDay.setDate(1 - firstDayOfMonth.getDay());

  const lastDayOfMonth = new Date(year, month + 1, 0);
  const endDay = new Date(lastDayOfMonth);
  endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));
  console.log("✅", firstDayOfMonth);
  console.log("🟡", startDay.setDate(1 - firstDayOfMonth.getDay()));

  return (
    <div>
      <header className="flex">
        <PrevIcon fill="white" />
        <span>{}</span>
        <NextIcon fill="white" />
      </header>

      <div className="flex">
        <section>
          <div></div>
        </section>

        <aside></aside>
      </div>
    </div>
  );
}
