import { getFirestore } from "firebase-admin/firestore";
import { StatusType, TaskType } from "@/types/scheduleType";
import "@/lib/firebase";

export async function fetchInitialStatusList(
  teamId: string
): Promise<StatusType[]> {
  const snap = await getFirestore()
    .collection("teams")
    .doc(teamId)
    .collection("statusList")
    .get();

  return snap.docs.map((status) => ({
    id: status.id,
    ...(status.data() as StatusType),
  }));
}

export async function fetchInitialTaskList(
  teamId: string
): Promise<TaskType[]> {
  const snap = await getFirestore()
    .collection("teams")
    .doc(teamId)
    .collection("tasks")
    .get();
  return snap.docs.map((task) => ({
    ...(task.data() as TaskType),
    id: task.id,
  }));
}
