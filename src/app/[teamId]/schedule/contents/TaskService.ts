import { db } from "@/lib/firebase";
import { TaskType } from "@/types/scheduleType";

export async function getTaskList(): Promise<TaskType[]> {
  const snapshot = await db.collection("task").get();
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as TaskType & { id: string })
  );
}
