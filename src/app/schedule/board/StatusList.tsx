"use client";
import { StatusType } from "@/types/scheduleType";
import menuIcon from "@/assets/three-dots.svg";
import plusIcon from "@/assets/plus.svg";
import Task from "./Task";
import IconButton from "@/components/common/button/IconButton";
interface Props {
  status: StatusType;
}

export default function StatusList({ status }: Props) {
  return (
    <section className="flex flex-col py-5 px-3 w-96 rounded-xl bg-background-status h-full">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-white text-xl">{status.statusName}</h2>
          <span className="bg-background-countBox py-1 px-3 rounded-xl text-white">
            {status.count}
          </span>
        </div>
        <span className="flex">
          <IconButton icon={menuIcon} alt="menu button" />
          <IconButton icon={plusIcon} alt="plus button" />
        </span>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        {status.taskList.map((task) => (
          <Task key={task.taskId} task={task} />
        ))}
      </div>
    </section>
  );
}
