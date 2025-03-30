"use client";
import { MouseEvent, useState } from "react";
import Task from "@/app/schedule/contents/board/Task";
import { confirmDeleteMessage } from "@/app/schedule/constants";
import { useContentsContext } from "@/app/schedule/contents/ContentsContext";
import Modal from "@/components/common/Modal";
import Editor from "@/components/common/Editor";
import MenuList from "@/components/dropdown/MenuList";
import IconButton from "@/components/common/button/IconButton";
import ConfirmDialog from "@/components/common/button/ConfirmDialog";
import { useModal } from "@/hooks/useModal";
import { StatusType, TaskType } from "@/types/scheduleType";
import menuIcon from "@/assets/three-dots.svg";
import plusIcon from "@/assets/plus.svg";

interface Props {
  status: StatusType;
  onDeleteStatus: (id: string) => Promise<void>;
}

export default function StatusList({ status, onDeleteStatus }: Props) {
  const { open, openModal, closeModal } = useModal();
  const { setStatusList, taskList } = useContentsContext();
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const filteredTasks = taskList.filter(
    (task: TaskType) => task.statusId === status.id
  );

  const toggleDropdown = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition(
      dropdownPosition
        ? null
        : {
            top: rect.bottom,
            left: rect.left,
          }
    );
  };

  const handleCloseDialog = () => setOpenConfirmDialog(false);
  const handleDeleteStatus = async () => {
    try {
      await onDeleteStatus(status.id!);
      setStatusList((prev) => prev.filter((item) => item.id !== status.id));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <section className="flex flex-col py-5 px-3 mb-[100px] w-96 rounded-xl bg-background-status h-full ">
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
          <Task key={`${task.taskId}-${index}`} task={task} />
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
          onClose={handleCloseDialog}
          closeText="Cancel"
          onConfrim={handleDeleteStatus}
          confirmText="Delete"
          contentText={confirmDeleteMessage}
        />
      )}

      {open && (
        <Modal onClose={closeModal}>
          <Editor onClose={closeModal} statusId={status.id!} />
        </Modal>
      )}
    </section>
  );
}
