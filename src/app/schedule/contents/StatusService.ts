import { db } from "@/lib/firebase";
import { StatusType } from "@/types/scheduleType";

export async function getStatusList(): Promise<StatusType[]> {
  const snapshot = await db.collection("statusList").get();
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as StatusType & { id: string })
  );
}
