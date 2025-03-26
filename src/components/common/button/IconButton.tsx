import { ComponentType, SVGProps, MouseEventHandler } from "react";

type Size = "sm" | "md";

const SIZE: Record<Size, string> = {
  sm: "w-[20px] h-[20px]",
  md: "w-[24px] h-[24px]",
};
interface Props {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  alt: string;
  size?: Size;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function IconButton({
  icon: Icon,
  alt,
  size = "md",
  onClick,
}: Props) {
  return (
    <button
      aria-label={alt}
      className="p-2 rounded hover:bg-headerBlue"
      onClick={onClick}
    >
      <Icon className={SIZE[size]} />
    </button>
  );
}
