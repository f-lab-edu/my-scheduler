"use client";
import { useState, ChangeEvent, useActionState } from "react";
import dayjs from "dayjs";
import { TaskActions } from "@/app/schedule/contents/TaskActions";
import ConfirmButton from "@/components/common/button/ConfirmButtons";
import {
  TaskFormStatusType,
  TaskFormType,
  Priority,
  DateField,
} from "@/types/scheduleType";
import CalendarIcon from "@/assets/calendar.svg";

const PRIORITIES = ["High", "Medium", "Low"];

export default function Editor() {
  const [formState, formAction] = useActionState<TaskFormStatusType, FormData>(
    TaskActions,
    {
      success: false,
      message: "",
    }
  );
  const [taskFormData, setTaskFormData] = useState<TaskFormType>({
    title: "",
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    priority: "High",
    description: "",
  });

  const priorityClasses: Record<Priority, string> = {
    High: "bg-priority-high",
    Medium: "bg-priority-medium",
    Low: "bg-priority-low",
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskFormData((prev) => ({ ...prev, title: event.target.value }));
  };

  const handleChangeDate = (
    event: ChangeEvent<HTMLInputElement>,
    dateField: DateField
  ) => {
    const newDate = dayjs(event.target.value);

    // TODO: 해당 유효성 검사를 submit 때 할지 정하기
    if (dateField === "end") {
      if (newDate.isBefore(dayjs(taskFormData.startDate))) {
        alert("종료 날짜는 시작 날짜보다 이전일 수 없습니다.");
        return;
      }
      setTaskFormData((prev) => ({
        ...prev,
        endDate: event.target.value,
      }));
    } else {
      setTaskFormData((prev) => ({
        ...prev,
        startDate: event.target.value,
      }));
    }
  };

  const handlePrioritySelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setTaskFormData((prev) => ({
      ...prev,
      priority: event.target.value as Priority,
    }));
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTaskFormData((prev) => ({ ...prev, description: event.target.value }));
  };

  return (
    <form
      action={formAction}
      className="py-[28px] px-[50px] rounded-lg bg-white "
    >
      <input
        name="title"
        placeholder="New Title"
        className="mt-7 border-b-2 border-border-editor w-[600px] h-[40px] text-2xl outline-none"
        value={taskFormData.title}
        onChange={handleTitleChange}
      />

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <CalendarIcon />
          <input
            name="startDate"
            type="date"
            placeholder="start"
            value={taskFormData.startDate}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChangeDate(event, "start")
            }
            className="border border-gray-300 rounded px-2 py-1 outline-none"
          />
          <input
            name="endDate"
            type="date"
            placeholder="end"
            value={taskFormData.endDate}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChangeDate(event, "end")
            }
            className="border border-gray-300 rounded px-2 py-1 outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span>priority</span>
          <select
            name="priority"
            className="border border-gray-300 rounded px-2 py-1 outline-none"
            onChange={handlePrioritySelect}
          >
            {PRIORITIES.map((priority, i) => (
              <option key={`${priority}-${i}`} value={priority}>
                {priority}
              </option>
            ))}
          </select>
          <div
            className={`w-7 h-7 rounded ${
              priorityClasses[taskFormData.priority]
            }`}
          />
        </div>
      </div>

      <textarea
        name="description"
        placeholder="Description"
        value={taskFormData.description}
        onChange={handleDescriptionChange}
        className="w-full min-h-[350px] h-32 mt-4 border border-gray-300 rounded p-5 outline-none resize-none"
      />

      <div className="flex justify-end space-x-2 mt-4">
        <ConfirmButton
          isSave={false}
          text="Cancel"
          type="button"
          onClose={() => {}}
        />
        <ConfirmButton isSave={true} text="Save" onClose={() => {}} />
      </div>

      {/* TODO: db 연결해서 테스트   */}
      {formState?.success && (
        <div className="text-green-600 mt-2">{formState.message}</div>
      )}
      {formState?.success === false && (
        <div className="text-red-600 mt-2">{formState.message}</div>
      )}
    </form>
  );
}
