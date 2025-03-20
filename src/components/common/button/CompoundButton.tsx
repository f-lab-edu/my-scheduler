import Button from "@/components/common/button/Button";
import { ButtonType } from "@/types/common";
import Image from "next/image";
import clsx from "clsx";

interface IconProps {
  icon?: string;
}

export default function CompoundButton({
  children,
  variant = "add",
  className = "",
  ...props
}: ButtonType) {
  const baseStyles =
    "flex items-center gap-2 px-4 py-2 focus:outline-none focus:ring-2";
  let variantStyles;
  if (variant === "add") {
    variantStyles = "bg-button-add text-white rounded-[30px] p-3";
  } else if (variant === "filter") {
    variantStyles = "rounded-[20px]";
  } else if (variant === "cancel") {
    variantStyles = "rounded-[10px]";
  } else if (variant === "confirm") {
    variantStyles = "rounded-[10px]";
  }

  return (
    <Button className={clsx(baseStyles, variantStyles, className)} {...props}>
      {children}
    </Button>
  );
}

function ButtonIcon({ icon }: IconProps) {
  return icon ? <Image src={icon} width={20} alt="icon" /> : null;
}

function ButtonText({ text }: { text: string }) {
  return <span>{text}</span>;
}

CompoundButton.Icon = ButtonIcon;
CompoundButton.Text = ButtonText;
