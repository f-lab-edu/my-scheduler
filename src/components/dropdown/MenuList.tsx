"use client";
import { KeyboardEvent, MouseEvent } from "react";
import Dropdown from "@/components/dropdown/Dropdown";

interface Props {
  top: number;
  left: number;
  list: string[];
  onClick: (
    event: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>
  ) => void;
  onClose: () => void;
}

export default function MenuList({ onClick, onClose, list, top, left }: Props) {
  return (
    <Dropdown onClose={onClose} top={top} left={left}>
      <ul>
        {list.map((item) => (
          <li
            role="button"
            key={item}
            onClick={(event) => {
              onClick(event);
              onClose();
            }}
            tabIndex={0}
            onKeyUp={(event: KeyboardEvent<HTMLLIElement>) => {
              if (event.key === "Enter" || event.key === " ") {
                onClick(event);
              }
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </Dropdown>
  );
}
