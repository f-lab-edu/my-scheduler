import { ButtonHTMLAttributes, ReactNode } from "react";

type Button = "add" | "filter" | "confirm" | "cancel";
export interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: Button;
}
