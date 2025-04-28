"use client";
import { DragEvent, useState } from "react";
import Task from "@/app/[teamId]/schedule/[tab]/board/Task";
import { confirmDeleteMessage } from "@/app/[teamId]/schedule/constants";
import { useContentsContext } from "@/app/[teamId]/schedule/contents/ContentsContext";
import Modal from "@/components/common/Modal";
import Editor from "@/components/common/Editor";
import MenuList from "@/components/dropdown/MenuList";
import IconButton from "@/components/common/button/IconButton";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useModal } from "@/hooks/useModal";
import useDropdownPosition from "@/hooks/useDropdownPosition";
import { StatusType, TaskType } from "@/types/scheduleType";
import menuIcon from "@/assets/three-dots.svg";
import plusIcon from "@/assets/plus.svg";

interface Props {
  status: StatusType;
  onDeleteStatus: (id: string) => Promise<void>;
}

export default function StatusList({ status, onDeleteStatus }: Props) {
  const { open, openModal, closeModal } = useModal();
  const { dropdownPosition, setDropdownPosition, toggleDropdown } =
    useDropdownPosition();

  const { taskList, setTaskList, onUpdateTask } = useContentsContext();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const filteredTasks = taskList
    .filter((task: TaskType) => task.statusId === status.id)
    .sort((a, b) => a.order - b.order);

  const handleCloseConfirmDialog = () => setOpenConfirmDialog(false);
  const handleDeleteStatus = async () => {
    try {
      await onDeleteStatus(status.id!);
    } catch (error: any) {
      setIsErrorDialogOpen(true);
      setErrorMessage(error.message);
    }
  };

  const handleEditTask = (task: TaskType) => {
    setEditingTask(task);
    openModal();
  };

  const handleDragStart = (event: DragEvent<HTMLDivElement>, task: TaskType) =>
    event.dataTransfer.setData("text/plain", task.id);

  const handleDragOver = (event: DragEvent<HTMLElement>) =>
    event.preventDefault();

  const handleDragOverTask = (
    event: DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    setDropTargetIndex(index);
  };

  const handleDrop = async (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    if (!taskId) return;

    let newTasks: TaskType[] = [];
    let draggedTask: TaskType | undefined;

    setTaskList((prevTasks: TaskType[]) => {
      const draggedIndex = prevTasks.findIndex((task) => task.id === taskId);
      if (draggedIndex === -1) return prevTasks;
      draggedTask = { ...prevTasks[draggedIndex] };

      newTasks = [...prevTasks];
      newTasks.splice(draggedIndex, 1);

      const statusIndices = newTasks
        .map((task, index) => (task.statusId === status.id ? index : -1))
        .filter((index) => index !== -1);

      const targetStatusTasks = newTasks.filter(
        (task) => task.statusId === status.id
      );

      // drop되는 status가 비어있으면 -> 리스트 끝,
      //드롭 대상 status의 task의 개수보다 dropTargetIndex가 클 때 -> 리스트의 끝
      const targetIndexInGroup =
        dropTargetIndex === null || dropTargetIndex > targetStatusTasks.length
          ? targetStatusTasks.length
          : dropTargetIndex;

      const insertIndex = statusIndices[targetIndexInGroup] ?? newTasks.length;

      draggedTask = { ...draggedTask!, statusId: status.id! };
      newTasks.splice(insertIndex, 0, draggedTask);

      //task들의 order 값을 재계산
      const updatedStatusTasks = newTasks
        .filter((task) => task.statusId === status.id)
        .map((task, index) => ({ ...task, order: index }));

      const newState = newTasks.map((task) =>
        task.statusId === status.id
          ? updatedStatusTasks.find((t) => t.id === task.id) || task
          : task
      );

      newTasks = newState;
      return newState;
    });
    // 초기화
    setDropTargetIndex(null);

    const tasksToUpdate = newTasks.filter(
      (task) => task.statusId === status.id
    );
    try {
      await Promise.all(tasksToUpdate.map((task) => onUpdateTask(task)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      className="flex flex-col py-5 px-3 mb-[100px] w-96 rounded-xl bg-background-status h-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-white text-xl">{status.statusName}</h2>
          <span className="bg-background-countBox py-1 px-3 rounded-xl text-white">
            {filteredTasks.length}
          </span>
        </div>
        <span className="flex">
          <IconButton
            icon={menuIcon}
            alt="menu button"
            onClick={(event) => toggleDropdown(event)}
          />
          <IconButton icon={plusIcon} alt="plus button" onClick={openModal} />
        </span>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        {filteredTasks.map((task, index) => (
          <div
            key={`${task.id}-${index}`}
            draggable
            onDragStart={(event) => handleDragStart(event, task)}
            onDragOver={(event) => handleDragOverTask(event, index)}
          >
            <Task
              key={`${task.id}-${index}`}
              task={task}
              onClick={() => handleEditTask(task)}
            />
          </div>
        ))}
      </div>

      {dropdownPosition && (
        <MenuList
          top={dropdownPosition.top}
          left={dropdownPosition.left}
          list={["Remove list"]}
          onClose={() => setDropdownPosition(null)}
          onClick={() => setOpenConfirmDialog(true)}
        />
      )}

      {openConfirmDialog && (
        <ConfirmDialog
          onClose={handleCloseConfirmDialog}
          closeText="Cancel"
          onConfrim={handleDeleteStatus}
          confirmText="Delete"
          contentText={confirmDeleteMessage}
        />
      )}

      {open && (
        <Modal onClose={closeModal}>
          <Editor
            onClose={() => {
              closeModal();
              setEditingTask(null);
            }}
            statusId={status.id!}
            editingTask={editingTask}
          />
        </Modal>
      )}

      {isErrorDialogOpen && (
        <ConfirmDialog
          onClose={() => setIsErrorDialogOpen(false)}
          contentText={errorMessage}
          closeText="Confirm"
        />
      )}
    </section>
  );
}
