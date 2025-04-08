"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import Agenda from "@/app/[teamId]/schedule/[tab]/calendar/Agenda";
import Modal from "@/components/common/Modal";
import Editor from "@/components/common/Editor";
import { useModal } from "@/hooks/useModal";
// import dynamic from "next/dynamic";
// const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
//   ssr: false,
// });

export default function Calendar() {
  const { closeModal } = useModal();

  const handleTaskClick = (info: EventClickArg) => {
    console.log("🟡", info.event.start);
  };

  return (
    <div className="flex flex-row justify-center gap-5 w-4/5 mx-auto">
      <div className="w-1/2 min-w-[770px]">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          aspectRatio={1.5}
          dayHeaderClassNames={() => ["bg-white", "text-black"]}
          dayCellClassNames={() => ["bg-white", "text-black"]}
          events={[
            { title: "event 1", date: "2025-04-01" },
            { title: "event 1", date: "2025-04-02" },
            { title: "event 2", date: "2025-04-02" },
          ]}
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
    </div>
  );
}
