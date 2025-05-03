import { Priority } from "@/types/scheduleType";
import { useState, MouseEvent } from "react";

interface DropdownPositionType {
  top: number;
  left: number;
}

export function useDropdownToggle() {
  const [dropdownPosition, setDropdownPosition] =
    useState<DropdownPositionType | null>(null);

  const toggleDropdown = (event: MouseEvent<HTMLButtonElement>) => {
    const { bottom, left } = event.currentTarget.getBoundingClientRect();
    setDropdownPosition((prev) => (prev ? null : { top: bottom, left: left }));
  };
  return { dropdownPosition, toggleDropdown, setDropdownPosition };
}

interface SelectedPrioritiesType {
  onApply: (selected: Priority[]) => void;
}

export function useDropdownApply({ onApply }: SelectedPrioritiesType) {
  const [dropdownPosition, setDropdownPosition] =
    useState<DropdownPositionType | null>(null);

  const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>([]); //최종반영
  const [togglePriorites, setTogglePriorities] = useState<Priority[]>([]); //임시 토글 ui

  const openDropdown = (event: MouseEvent<HTMLButtonElement>) => {
    const { bottom, left } = event.currentTarget.getBoundingClientRect();
    setTogglePriorities(selectedPriorities);
    setDropdownPosition({ top: bottom, left });
  };

  const closeDropdown = () => {
    setDropdownPosition(null);
    setTogglePriorities(selectedPriorities);
  };
  const togglePriority = (priority: Priority) => {
    setTogglePriorities((prev) =>
      prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority]
    );
  };

  const applyPriorities = () => {
    setSelectedPriorities(togglePriorites);
    onApply(togglePriorites);
    closeDropdown();
  };

  return {
    dropdownPosition,
    selectedPriorities: togglePriorites,
    openDropdown,
    closeDropdown,
    togglePriority,
    applyPriorities,
  };
}
