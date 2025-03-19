"use client";
import calendarIcon from "@/assets/calendar.svg";
import Image from "next/image";

const PRIORITIES = ["High", "Medium", "Low"];
export default function Editor() {
  // value 처리
  return (
    <div className="py-[28px] px-[50px] rounded-lg bg-white ">
      <input
        placeholder="New Title"
        className="mt-7 border-b-2 border-border-editor w-[600px] h-[40px] text-2xl outline-none"
        value=""
        onChange={() => {}}
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
            value=""
            onChange={() => {}}
          />
          <input
            className="border border-gray-300 rounded px-2 py-1 outline-none"
            type="date"
            placeholder="end"
            value=""
            onChange={() => {}}
          />
        </div>

        <div className="flex items-center space-x-2">
          <span>priority</span>
          <select
            className="border border-gray-300 rounded px-2 py-1 outline-none"
            onChange={() => {}}
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
        className="mt-4 w-full h-32 border border-gray-300 rounded p-2 outline-none"
        placeholder="Description"
        value=""
        onChange={() => {}}
      />

      <div className="flex justify-end space-x-2 mt-4"></div>
    </div>
  );
}
