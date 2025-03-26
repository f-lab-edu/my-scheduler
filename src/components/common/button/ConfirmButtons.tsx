import clsx from "clsx";
interface Props {
  isSave: boolean;
  text: string;
  type?: "button" | "submit" | "reset";
}
export default function ConfirmButton({
  isSave,
  text,
  type = "submit",
}: Props) {
  return (
    <button
      className={clsx(
        isSave
          ? "bg-button-save text-white"
          : "bg-white border border-button-save",
        "w-[108px] h-11 px-5 rounded-lg cursor-pointer"
      )}
      type={type}
    >
      {text}
    </button>
  );
}
