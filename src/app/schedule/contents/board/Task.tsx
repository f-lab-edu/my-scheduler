"use client";

import clsx from "clsx";
import CalendarIcon from "@/assets/calendar.svg";
import { TaskType } from "@/types/scheduleType";

interface Props {
  task: TaskType;
  onClick: () => void;
}

const PRIORITY: Record<TaskType["priority"], string> = {
  High: "bg-priority-high",
  Medium: "bg-priority-medium",
  Low: "bg-priority-low",
};

export default function Task({ task, onClick }: Props) {
  return (
    <article
      className={clsx(
        PRIORITY[task.priority],
        "p-4 rounded-2xl text-font-gray cursor-pointer"
      )}
      onClick={onClick}
    >
      <div className="flex justify-between">
        <div className="flex gap-2">
          <CalendarIcon className="w-6 h-6 fill-current" />
          <time>{task.startDate}</time>
        </div>
        <span>{task.priority} priority</span>
      </div>
      <div className="pt-6">
        <div className="font-semibold">{task.title}</div>
        <div className="mt-3 text-font-gray">{task.description}</div>
      </div>
    </article>
  );
}
