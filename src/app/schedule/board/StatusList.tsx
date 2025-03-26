"use client";
import { MouseEvent, useState } from "react";
import Task from "@/app/schedule/board/Task";
import IconButton from "@/components/common/button/IconButton";
import { StatusType } from "@/types/scheduleType";
import menuIcon from "@/assets/three-dots.svg";
import plusIcon from "@/assets/plus.svg";
import MenuList from "@/components/dropdown/MenuList";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/common/Modal";
import Editor from "@/components/common/Editor";

interface Props {
  status: StatusType;
}

export default function StatusList({ status }: Props) {
  const { open, openModal, closeModal } = useModal();
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

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
  return (
    <section className="flex flex-col py-5 px-3 mb-[100px] w-96 rounded-xl bg-background-status h-full ">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-white text-xl">{status.statusName}</h2>
          <span className="bg-background-countBox py-1 px-3 rounded-xl text-white">
            {status.count}
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
        {status.taskList.map((task) => (
          <Task key={task.taskId} task={task} />
        ))}
      </div>

      {dropdownPosition && (
        <MenuList
          top={dropdownPosition.top}
          left={dropdownPosition.left}
          onClick={() => setDropdownPosition(null)}
        />
      )}

      {open && (
        <Modal onClose={closeModal}>
          <Editor />
        </Modal>
      )}
    </section>
  );
}
