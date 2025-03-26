import clsx from "clsx";
interface Props {
  isSave: boolean;
  text: string;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md";
  onClose: () => void;
}

export default function ConfirmButton({
  isSave,
  text,
  type = "submit",
  size = "md",
  onClose,
}: Props) {
  const baseClassName = "rounded-lg cursor-pointer";
  const saveClassName = isSave
    ? "bg-button-save text-white"
    : "bg-white border border-button-save";
  const sizeClassName =
    size === "sm"
      ? "w-[75px] h-[40px] text-[14px] p-[10px]"
      : "w-[108px] h-11 px-5";

  const handleInputClose = () => {
    if (isSave) {
      onClose();
      // TODO: 저장동작 (서버함수)
    } else onClose();
  };

  return (
    <button
      className={clsx(saveClassName, sizeClassName, baseClassName)}
      type={type}
      onClick={handleInputClose}
    >
      {text}
    </button>
  );
}
