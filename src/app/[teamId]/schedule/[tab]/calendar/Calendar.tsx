"use client";
import { useState } from "react";
import Agenda from "@/app/[teamId]/schedule/[tab]/calendar/Agenda";
import { MONTH_NAMES, WEEK } from "@/app/[teamId]/schedule/constants";
import PrevIcon from "@/assets/caret-left-fill.svg";
import NextIcon from "@/assets/caret-right-fill.svg";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const generateCalendarCells = () => {
    const firstDayOfMonth = new Date(year, month, 1);
    const startDay = firstDayOfMonth.getDay();
    const thisLastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();
    const totalCells = 42;
    const currentCellCount = startDay + thisLastDate;
    const nextDays = totalCells - currentCellCount;

    const prevCells = Array.from({ length: startDay }, (_, i) => {
      const prevMonthDay = prevLastDate - startDay + (i + 1);
      return (
        <div key={`prev-${i}`} className="min-h-[100px] p-3 text-gray-300">
          <span className="day-num prev-month-day">{prevMonthDay}</span>
        </div>
      );
    });

    const currentCells = Array.from({ length: thisLastDate }, (_, i) => {
      const day = i + 1;
      const dayStr = String(day).padStart(2, "0");
      const monthStr = String(month + 1).padStart(2, "0");
      const dateStr = `${year}-${monthStr}-${dayStr}`;
      return (
        <div
          key={`current-${day}`}
          className="p-3 min-h-[100px]"
          data-date={dateStr}
        >
          <span className="day-num">{day}</span>
        </div>
      );
    });

    const nextCells = Array.from({ length: nextDays }, (_, i) => {
      const day = i + 1;
      return (
        <div key={`next-${day}`} className="p-3 min-h-[100px] text-gray-300">
          <span className="day-num next-month-day">{day}</span>
        </div>
      );
    });

    return [...prevCells, ...currentCells, ...nextCells];
  };

  const handlePrevMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  return (
    <div className="flex justify-center gap-5 px-[100px]">
      <section className="flex flex-col py-5 px-3 mb-[100px] w-[700px] rounded-xl  h-auto">
        <header className="calendar-header flex items-center justify-between p-4 w-[180px] text-white cursor-pointer">
          <button onClick={handlePrevMonth} className="prev-button">
            <PrevIcon fill="white" />
          </button>
          <h2>
            {MONTH_NAMES[month]} {year}
          </h2>
          <button onClick={handleNextMonth} className="next-button">
            <NextIcon fill="white" />
          </button>
        </header>

        <div className="calendar bg-white">
          <div className="week-days grid grid-cols-7 p-5 text-center font-bold">
            {WEEK.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="calendar-grid grid grid-cols-7 gap-1 border-t border-l min-h-[100px] bg-white">
            {generateCalendarCells()}
          </div>
        </div>
      </section>
      {/* TODO: Agenda 데이터 연결*/}
      <Agenda monthlyTasks={[]} />
    </div>
  );
}
