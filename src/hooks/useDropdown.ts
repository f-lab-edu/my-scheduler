import { useState, MouseEvent } from "react";

interface DropdownPosition {
  top: number;
  left: number;
}

export function useDropdownToggle() {
  const [dropdownPosition, setDropdownPosition] =
    useState<DropdownPosition | null>(null);

  const toggleDropdown = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition((prev) =>
      prev ? null : { top: rect.bottom, left: rect.left }
    );
  };

  return { dropdownPosition, toggleDropdown, setDropdownPosition };
}
