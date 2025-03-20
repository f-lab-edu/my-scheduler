import clsx from "clsx";
import { ButtonType } from "@/types/common";

export default function Button({ children, className, ...props }: ButtonType) {
  return (
    <button className={clsx(className)} {...props}>
      {children}
    </button>
  );
}
