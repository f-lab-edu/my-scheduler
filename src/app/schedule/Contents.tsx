import StatusList from "./board/StatusList";
import { Priorities } from "@/types/scheduleType";

const statusDummyData = [
  {
    statusName: "To do",
    count: 3,
    taskList: [
      {
        title: "밥 먹기",
        startDate: "2025-03-03",
        endDate: "2025-04-01",
        priority: "high" as Priorities,
        description: "밥 먹고 뭐 먹을까",
        statusId: "1",
        taskId: "2",
        months: [3, 4],
        order: 2,
      },
    ],
  },
  {
    statusName: "In progress",
    count: 3,
    taskList: [
      {
        title: "밥 먹기",
        startDate: "2025-03-03",
        endDate: "2025-04-01",
        priority: "high" as Priorities,
        description: "밥 먹고 뭐 먹을까",
        statusId: "1",
        taskId: "2",
        months: [3, 4],
        order: 2,
      },
      {
        title: "놀기",
        startDate: "2025-03-26",
        endDate: "2025-03-26",
        priority: "high" as Priorities,
        description: "뭐하고 놀까",
        statusId: "2",
        taskId: "3",
        months: [3],
        order: 2,
      },
    ],
  },
];

export default function Contents() {
  return (
    <section className="flex gap-4 mx-4">
      {statusDummyData.map((status, index) => (
        <StatusList key={`${status.statusName}-${index}`} status={status} />
      ))}
    </section>
  );
}
