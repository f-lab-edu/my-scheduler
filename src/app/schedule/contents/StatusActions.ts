"use server";

import { db } from "@/lib/firebase";
import { StatusType } from "@/types/scheduleType";

interface Props {
  status: StatusType;
}

export async function handleCreateNewStatus({ status }: Props) {
  const result = await db.collection("statusList").add(status);
  return result.id;
}
