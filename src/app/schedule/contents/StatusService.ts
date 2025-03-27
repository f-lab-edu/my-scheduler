import { db } from "@/lib/firebase";
import { StatusType } from "@/types/scheduleType";

interface Props {
  status: StatusType;
}

export async function createNewStatus({ status }: Props) {
  "use server";
  const result = await db.collection("statusList").add(status);
  return result.id;
}

export async function getStatusList(): Promise<StatusType[]> {
  const snapshot = await db.collection("statusList").get();
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as StatusType & { id: string })
  );
}

export async function deleteStatus(id: string) {
  "use server";
  await db.collection("statusList").doc(id).delete();
}
