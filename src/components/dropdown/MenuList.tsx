"use client";
import { MouseEvent } from "react";
import Dropdown from "@/components/dropdown/Dropdown";

interface Props {
  top: number;
  left: number;
  list: string[];
  onClick: (event: MouseEvent<HTMLLIElement>) => void;
  onClose: () => void;
}

export default function MenuList({ onClick, onClose, list, top, left }: Props) {
  return (
    <Dropdown onClose={onClose} top={top} left={left}>
      <ul>
        {list.map((item, index) => (
          <li
            role="button"
            key={`${item}-${index}`}
            onClick={(event) => onClick(event)}
          >
            {item}
          </li>
        ))}
      </ul>
    </Dropdown>
  );
}
