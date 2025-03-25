"use client";
import Image from "next/image";
import { StatusType } from "@/types/scheduleType";
import menuIcon from "@/assets/three-dots.svg";
import plusIcon from "@/assets/plus.svg";
interface Props {
  status: StatusType;
}

export default function StatusList({ status }: Props) {
  return (
    <section className="flex flex-col py-5 px-3 w-96 rounded-xl bg-background-status">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-white text-xl">{status.statusName}</h2>
          <span className="bg-background-countBox py-1 px-3 rounded-xl text-white">
            {status.count}
          </span>
        </div>
        <span className="flex">
          <Image src={menuIcon} alt="menu button" />
          <Image width={24} height={24} src={plusIcon} alt="plus button" />
        </span>
      </div>
    </section>
  );
}
