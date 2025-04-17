"use client";

import { ButtonHTMLAttributes } from "react";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly text: string;
}

export default function SubmitButton({
  onClick,
  text,
  type = "button",
}: SubmitButtonProps) {
  return (
    <button
      className="bg-button-save text-white w-full py-[20px] px-[174px] rounded-lg"
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}
