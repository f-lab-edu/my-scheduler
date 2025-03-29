import Modal from "@/components/common/Modal";
import ConfirmButton from "./ConfirmButtons";

interface Props {
  onClose: () => void;
  contentText: string;
  closeText: string;
  onConfrim?: () => void;
  confirmText?: string;
}

export default function ConfirmDialog({
  contentText,
  onConfrim,
  onClose,
  confirmText,
  closeText,
}: Props) {
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-8 justify-center items-center p-6 rounded-lg w-[360px] h-[180px] bg-white">
        <p className="pt-4">{contentText}</p>
        <div className="flex gap-2">
          <ConfirmButton
            onClick={onClose}
            variant="cancel"
            text={closeText}
            type="button"
          />
          {confirmText && onConfrim && (
            <ConfirmButton
              onClick={onConfrim}
              variant="confirm"
              text={confirmText}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}
