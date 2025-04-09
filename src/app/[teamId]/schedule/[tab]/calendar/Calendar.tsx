"use client";
import dayjs from "dayjs";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../../../tailwind.config";
import Agenda from "@/app/[teamId]/schedule/[tab]/calendar/Agenda";
import Modal from "@/components/common/Modal";
import Editor from "@/components/common/Editor";
import { useModal } from "@/hooks/useModal";
import { useEffect, useState } from "react";
import { TaskType, CalendarEventType } from "@/types/scheduleType";
import { MyTailwindConfig, PriorityColors } from "@/types/commonType";
import { useContentsContext } from "../../contents/ContentsContext";

const fullConfig = resolveConfig(tailwindConfig) as unknown as MyTailwindConfig;

export default function Calendar() {
  const { open, closeModal, openModal } = useModal();
  const { taskList } = useContentsContext();
  const [editingTask] = useState<TaskType | null>(null);
  const [eventList, setEventList] = useState<CalendarEventType[] | []>([]);

  useEffect(() => {
    const taskGroupingById = taskList.reduce((acc, task) => {
      acc[task.id] = [...(acc[task.id] ?? []), task];
      return acc;
    }, {} as Record<string, TaskType[]>);

    const events = Object.keys(taskGroupingById).map((taskId) => {
      const tasks = taskGroupingById[taskId];

      const { title, priority } = tasks[0];

      const earliestStart = tasks.reduce((prev, cur) =>
        dayjs(cur.startDate).isBefore(dayjs(prev.startDate)) ? cur : prev
      );

      const latestEnd = tasks.reduce((prev, cur) =>
        dayjs(cur.endDate).isAfter(dayjs(prev.endDate)) ? cur : prev
      );

      const startDate = earliestStart.startDate;
      const endDate = latestEnd.endDate;

      return {
        id: taskId,
        groupId: taskId,
        title: title,
        start: startDate,
        end: dayjs(endDate).add(1, "day").format("YYYY-MM-DD"),
        color: getColorByPriority(priority),
      };
    });

    setEventList(events);
  }, [taskList]);

  const handleTaskClick = (info: EventClickArg) => {
    // TODO: editor 처리
    openModal();
    console.log(info);
  };

  return (
    <div className="flex flex-row justify-center gap-5 w-4/5 mx-auto">
      <div className="w-1/2 min-w-[770px]">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          aspectRatio={1.5}
          events={eventList}
          editable={true}
          selectable={true}
          headerToolbar={{
            left: "prev title next",
            center: "",
            right: "today",
          }}
          height="auto"
          contentHeight="auto"
          eventClick={handleTaskClick}
        />
      </div>
      <Agenda />
      {open && (
        <Modal onClose={closeModal}>
          <Editor
            onClose={() => {
              closeModal();
            }}
            // TODO: 클릭 처리하면서 statusId 수정
            statusId={"1"}
            editingTask={editingTask}
          />
        </Modal>
      )}
    </div>
  );
}

function getColorByPriority(priority: string) {
  const priorityName = priority.toLowerCase();
  const priorityObj = fullConfig.theme?.colors?.priority as PriorityColors;

  if (priorityName === "high") {
    return priorityObj.high;
  } else if (priorityName === "medium") {
    return priorityObj.medium;
  } else if (priorityName === "low") {
    return priorityObj.low;
  } else {
    throw new Error(`${priority} error`);
  }
}
