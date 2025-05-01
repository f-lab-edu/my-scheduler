import Dropdown from "@/components/dropdown/Dropdown";

interface Props {
  top: number;
  left: number;
  list: string[];
  onClose: () => void;
}

const PRIORITIES = ["High Priority", "Medium Priority", "Low Priority"];

export default function PriorityFilterDropdown({
  onClose,
  list,
  top,
  left,
}: Props) {
  return (
    <Dropdown top={top} left={left} onClose={onClose}>
      <div>
        {PRIORITIES.map((priority) => (
          <div key={priority} className="flex gap-2">
            <input type="checkbox" />
            <span>{priority}</span>
          </div>
        ))}
      </div>
    </Dropdown>
  );
}
