import StatusList from "@/app/schedule/contents/board/StatusList";
import { Priority } from "@/types/scheduleType";
import SideAddColumnButton from "@/components/common/button/SideAddColumnButton";
import AddStatusInput from "@/components/common/AddStatusInput";

const statusDummyData = [
  {
    statusName: "To do",
    count: 3,
    taskList: [
      {
        title: "밥 먹기",
        startDate: "2025-03-03",
        endDate: "2025-04-01",
        priority: "High" as Priority,
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
        priority: "High" as Priority,
        description: "밥 먹고 뭐 먹을까",
        statusId: "1",
        taskId: "3",
        months: [3, 4],
        order: 2,
      },
      {
        title: "놀기",
        startDate: "2025-03-26",
        endDate: "2025-03-26",
        priority: "Low" as Priority,
        description: "뭐하고 놀까",
        statusId: "4",
        taskId: "5",
        months: [3],
        order: 2,
      },
    ],
  },
];

export default function Contents() {
  return (
    <div className="flex px-[70px] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500">
      <section className="flex gap-4 h-full">
        {statusDummyData.map((status, index) => (
          <StatusList key={`${status.statusName}-${index}`} status={status} />
        ))}
      </section>
      <section className="flex justify-end py-5 px-3 w-96 ml-4 rounded-xl m-w-[150px] h-full bg-background-status hover:bg-headerBlue">
        {/* <SideAddColumnButton /> */}
        <AddStatusInput />
      </section>
    </div>
  );
}
