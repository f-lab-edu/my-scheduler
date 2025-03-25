"use client";

import Dropdown from "./Dropdown";

interface Props {
  top: number;
  left: number;
  onClick: () => void;
}

export default function MenuList({ onClick, top, left }: Props) {
  const list = ["Remove Status"];

  return (
    <Dropdown onClose={onClick} top={top} left={left}>
      <ul>
        {list.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </Dropdown>
  );
}
