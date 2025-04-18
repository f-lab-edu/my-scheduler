import { ReactNode } from "react";

type Props = Readonly<{
  children: ReactNode;
}>;

export default function AuthLayout({ children }: Props) {
  return (
    <div className="mx-auto my-20 w-[480px] py-5 px-[28px] rounded-lg bg-white">
      {children}
    </div>
  );
}
