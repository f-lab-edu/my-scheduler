"use server";
import { db } from "@/lib/firebase";
import { StatusType } from "@/types/scheduleType";

export async function createNewStatus(status: StatusType): Promise<string> {
  const result = await db.collection("statusList").add(status);
  return result.id;
}

export async function deleteStatus(id: string): Promise<void> {
  await db.collection("statusList").doc(id).delete();
}
