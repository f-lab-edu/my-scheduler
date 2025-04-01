import { TaskType } from "@/types/scheduleType";

interface Props {
  monthlyTasks: TaskType[];
}

export default function Agenda({ monthlyTasks }: Props) {
  return (
    <aside className="w-[500px] mt-[76px] rounded-lg h-full min-h-[300px] p-5 text-white bg-background-agendaBox">
      {monthlyTasks.map((task, index) => (
        <div key={`${task}-${index}`}></div>
      ))}
    </aside>
  );
}
