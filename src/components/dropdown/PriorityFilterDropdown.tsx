"use client";
import Dropdown from "@/components/dropdown/Dropdown";
import ConfirmButton from "../common/button/ConfirmButton";
import { Priority } from "@/types/scheduleType";

interface Props {
  dropdownPosition: { top: number; left: number } | null;
  selectedPriorities: string[];
  togglePriority: (p: Priority) => void;
  applyPriorities: () => void;
  onClose: () => void;
}

const PRIORITIES = ["High", "Medium", "Low"] as Priority[];

export default function PriorityFilterDropdown({
  dropdownPosition,
  selectedPriorities,
  togglePriority,
  applyPriorities,
  onClose,
}: Props) {
  if (!dropdownPosition) return null;

  return (
    <Dropdown
      top={dropdownPosition && dropdownPosition.top}
      left={dropdownPosition && dropdownPosition.left}
      onClose={onClose}
    >
      <div>
        <div className="flex items-center gap-2">
          <h4 className="text-md">Prioritied</h4>
          <ConfirmButton
            variant="cancel"
            text="Apply"
            type="button"
            size="xs"
            onClick={applyPriorities}
          />
        </div>
        <ul>
          {PRIORITIES.map((priority) => (
            <li key={priority} className="flex gap-2">
              <input
                type="checkbox"
                id={priority}
                checked={selectedPriorities.includes(priority)}
                onChange={() => togglePriority(priority)}
              />
              <label htmlFor={priority}>{priority} priority</label>
            </li>
          ))}
        </ul>
      </div>
    </Dropdown>
  );
}
