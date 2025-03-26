"use client";

import Contents from "@/app/schedule/Contents";
import Editor from "@/components/common/Editor";
import Modal from "@/components/common/Modal";
import { useModal } from "@/hooks/useModal";

export default function Page() {
  const { open, openModal, closeModal } = useModal();

  return (
    <h1>
      <Contents />
      <button onClick={openModal}>누르기테스트</button>
      {open && (
        <Modal onClose={closeModal}>
          <Editor />
        </Modal>
      )}
    </h1>
  );
}
