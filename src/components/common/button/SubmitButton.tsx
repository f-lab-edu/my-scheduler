"use client";

interface Props {
  onClick: () => void;
  text: string;
}

export default function SUbmitButton({ onClick, text }: Props) {
  return (
    <button
      className="bg-button-save text-white w-full py-[20px] px-[174px] rounded-lg"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
