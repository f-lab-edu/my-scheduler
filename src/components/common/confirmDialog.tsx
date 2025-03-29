import Modal from "@/components/common/Modal";

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
