"use client";
import { useState, ChangeEvent } from "react";
import calendarIcon from "@/assets/calendar.svg";
import Image from "next/image";
import dayjs from "dayjs";

type DateField = "start" | "end";

const PRIORITIES = ["High", "Medium", "Low"];
export default function Editor() {
  const [formData, setFormData] = useState({
    title: "",
    // startDate: dayjs(new Date()).format("YYYY-MM-DD"),
    // endDate: dayjs(new Date()).format("YYYY-MM-DD"),
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    priority: "High",
    description: "",
  });
  // TODO: 상태 및 props 처리

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, title: event.target.value }));
  };

  const handleChangeDate = (
    event: ChangeEvent<HTMLInputElement>,
    dateField: DateField
  ) => {
    const newDate = dayjs(event.target.value);
    console.log("🟢", newDate);
    const date = event.target.value;

    // TODO: 해당 유효성 검사를 submit 때 할지
    if (dateField === "end") {
      if (newDate.isBefore(dayjs(formData.startDate))) {
        alert("종료 날짜는 시작 날짜보다 이전일 수 없습니다.");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        endDate: event.target.value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        startDate: event.target.value,
      }));
    }
  };

  const handlePrioritySelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, priority: event.target.value }));
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, description: event.target.value }));
  };

  return (
    <div className="py-[28px] px-[50px] rounded-lg bg-white ">
      <input
        placeholder="New Title"
        className="mt-7 border-b-2 border-border-editor w-[600px] h-[40px] text-2xl outline-none"
        value={formData.title}
        onChange={handleTitleChange}
      />

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <Image
            width={24}
            height={24}
            src={calendarIcon}
            alt="calendar icon"
          />
          <input
            className="border border-gray-300 rounded px-2 py-1 outline-none"
            type="date"
            placeholder="start"
            value={formData.startDate}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChangeDate(event, "start")
            }
          />
          <input
            className="border border-gray-300 rounded px-2 py-1 outline-none"
            type="date"
            placeholder="end"
            value={formData.endDate}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChangeDate(event, "end")
            }
          />
        </div>

        <div className="flex items-center space-x-2">
          <span>priority</span>
          <select
            className="border border-gray-300 rounded px-2 py-1 outline-none"
            onChange={handlePrioritySelect}
          >
            {PRIORITIES.map((priority, i) => (
              <option key={`${priority}-${i}`} value={priority}>
                {priority}
              </option>
            ))}
          </select>
          <div className="w-4 h-4 rounded-full bg-blue-500" />
        </div>
      </div>

      <textarea
        className="w-full min-h-[350px] h-32 mt-4 border border-gray-300 rounded p-5 outline-none resize-none"
        placeholder="Description"
        value={formData.description}
        onChange={handleDescriptionChange}
      />

      <div className="flex justify-end space-x-2 mt-4">
        <button>cancel</button>
        <button>submit</button>
      </div>
    </div>
  );
}
