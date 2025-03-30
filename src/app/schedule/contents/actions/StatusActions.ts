"use server";
import { db } from "@/lib/firebase";
import { StatusType } from "@/types/scheduleType";

interface Props {
  status: StatusType;
}

export async function createNewStatus({ status }: Props) {
  const result = await db.collection("statusList").add(status);
  return result.id;
}

export async function deleteStatus(id: string) {
  await db.collection("statusList").doc(id).delete();
}
