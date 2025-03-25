import { useModal } from "@/hooks/useModal";
import Modal from "./Modal";

interface Props {
  onClose: () => void;
}

export default function ConfirmDialog({ onClose }: Props) {
  return (
    <Modal onClose={onClose}>
      <div></div>
    </Modal>
  );
}
