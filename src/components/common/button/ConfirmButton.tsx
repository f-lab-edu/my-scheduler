import clsx from "clsx";
interface Props {
  variant?: "confirm" | "cancel";
  text: string;
  type?: "button" | "submit";
  size?: "sm" | "md";
  onClick: () => void;
}

export default function ConfirmButton({
  variant = "confirm",
  text,
  type = "submit",
  size = "md",
  onClick,
}: Props) {
  const baseClassName = "rounded-lg cursor-pointer";

  const variantClassNames: Record<"confirm" | "cancel", string> = {
    confirm: "bg-button-save text-white hover:bg-hover-save",
    cancel: "bg-gray-200 text-gray-600 border border-gray-400 hover:bg-white",
  };

  const confirmClassName = variantClassNames[variant];
  const sizeClassName =
    size === "sm"
      ? "w-[75px] h-[40px] text-[14px] p-[10px]"
      : "w-[108px] h-11 px-5";

  return (
    <button
      className={clsx(confirmClassName, sizeClassName, baseClassName)}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
