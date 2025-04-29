"use client";

import { useState, ChangeEvent, useActionState } from "react";
import dayjs from "dayjs";
import {
  confirmSaveMessage,
  confirmTaskDeleteMessage,
} from "@/app/[teamId]/schedule/constants";
import { TaskAction } from "@/app/[teamId]/schedule/contents/actions/TaskActions";
import { useContentsContext } from "@/app/[teamId]/schedule/contents/ContentsContext";
import ConfirmDialog from "@/components/common/ConfirmDialog";

import ConfirmButton from "@/components/common/button/ConfirmButton";
import {
  TaskFormStatusType,
  TaskType,
  Priority,
  DateField,
} from "@/types/scheduleType";
import useDropdownPosition from "@/hooks/useDropdownPosition";
import CalendarIcon from "@/assets/calendar.svg";
import menuIcon from "@/assets/three-dots-vertical.svg";
import IconButton from "./button/IconButton";
import MenuList from "../dropdown/MenuList";

interface Props {
  onClose: () => void;
  statusId: string;
  editingTask?: TaskType | null;
}

const PRIORITIES = ["High", "Medium", "Low"];

export default function Editor({ onClose, statusId, editingTask }: Props) {
  const initialFormData: TaskType = editingTask || {
    id: "",
    title: "",
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    priority: "High",
    description: "",
    statusId,
    order: 0,
  };
  const [taskFormData, setTaskFormData] = useState<TaskType>(initialFormData);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { onCreateNewTask, taskList, onUpdateTask, onDeleteTask } =
    useContentsContext();
  const [formState, formAction] = useActionState<TaskFormStatusType, FormData>(
    TaskAction,
    {
      success: false,
      message: "",
    }
  );
  const { dropdownPosition, setDropdownPosition, toggleDropdown } =
    useDropdownPosition();

  const priorityClasses: Record<Priority, string> = {
    High: "bg-priority-high",
    Medium: "bg-priority-medium",
    Low: "bg-priority-low",
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setTaskFormData((prev) => ({ ...prev, title: event.target.value }));

  const handleChangeDate = (
    event: ChangeEvent<HTMLInputElement>,
    dateField: DateField
  ) => {
    if (dateField === "end") {
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

  const handlePrioritySelect = (event: ChangeEvent<HTMLSelectElement>) =>
    setTaskFormData((prev) => ({
      ...prev,
      priority: event.target.value as Priority,
    }));

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setTaskFormData((prev) => ({ ...prev, description: event.target.value }));

  const handleCloseDialog = () => setOpenConfirmDialog(false);
  const handleSaveTask = async () => {
    try {
      if (editingTask) {
        await onUpdateTask({
          ...taskFormData,
          statusId,
          id: editingTask.id,
        });
      } else {
        const filteredTasks = taskList.filter(
          (task: TaskType) => task.statusId === statusId
        );
        const newTaskOrder =
          filteredTasks.length > 0
            ? Math.max(...filteredTasks.map((task) => task.order ?? 0)) + 1
            : 0;
        const newTask = { ...taskFormData, statusId, order: newTaskOrder };
        await onCreateNewTask(newTask);
      }
      setOpenConfirmDialog(false);
      onClose();
    } catch (error: any) {
      setIsErrorDialogOpen(true);
      setErrorMessage(error.message);
    }
  };

  const handleCloseConfirmDialog = () => setOpenConfirmDialog(false);
  const handleDeleteTask = async () => {
    try {
      await onDeleteTask(taskFormData.id);
      setOpenConfirmDeleteDialog(false);
      onClose();
    } catch (error: any) {
      setIsErrorDialogOpen(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <form
      action={formAction}
      className="py-[28px] px-[50px] rounded-lg bg-white "
    >
      <div className="flex items-end justify-between">
        <input
          name="title"
          placeholder="New Title"
          className="mt-7 border-b-2 border-border-editor w-[500px] h-[40px] text-2xl outline-none"
          value={taskFormData.title}
          onChange={handleTitleChange}
        />
        <div className="pl-8">
          <IconButton
            icon={menuIcon}
            alt="menu button"
            size="sm"
            onClick={(event) => toggleDropdown(event)}
          />
        </div>
      </div>
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
          variant="cancel"
          text="Cancel"
          type="button"
          onClick={onClose}
        />

        <ConfirmButton
          variant="confirm"
          text="Save"
          onClick={() => setOpenConfirmDialog(true)}
        />
      </div>

      {openConfirmDialog &&
        (formState?.success ? (
          <ConfirmDialog
            onClose={handleCloseDialog}
            onConfrim={handleSaveTask}
            contentText={confirmSaveMessage}
            closeText="Cancel"
            confirmText="Save"
          />
        ) : (
          <ConfirmDialog
            onClose={handleCloseDialog}
            contentText={formState.message}
            closeText="Confirm"
          />
        ))}

      {dropdownPosition && (
        <MenuList
          top={dropdownPosition.top}
          left={dropdownPosition.left}
          list={["Remove task"]}
          onClose={() => setDropdownPosition(null)}
          onClick={() => setOpenConfirmDeleteDialog(true)}
        />
      )}

      {openConfirmDeleteDialog && (
        <ConfirmDialog
          onClose={handleCloseConfirmDialog}
          closeText="Cancel"
          onConfrim={handleDeleteTask}
          confirmText="Delete"
          contentText={confirmTaskDeleteMessage}
        />
      )}

      {isErrorDialogOpen && (
        <ConfirmDialog
          onClose={() => setIsErrorDialogOpen(false)}
          contentText={errorMessage}
          closeText="Confirm"
        />
      )}
    </form>
  );
}
