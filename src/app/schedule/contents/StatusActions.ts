// "use server";

// import { addDoc, collection } from "firebase/firestore";
// import { db } from "../../../../lib/firebaseClient";
// import { StatusType } from "@/types/scheduleType";

// interface Props {
//   status: StatusType;
// }

// export async function handleCreateNewStatus({ status }: Props) {
//   const result = await addDoc(collection(db, "statusList"), status);
//   console.log("🔴", result);
//   return result.id;
// }

"use server";

import { db } from "../../../../lib/firebase";
import { StatusType } from "@/types/scheduleType";

interface Props {
  status: StatusType;
}

export async function handleCreateNewStatus({ status }: Props) {
  const result = await db.collection("statusList").add(status);
  console.log("🔴", result);
  return result.id;
}
