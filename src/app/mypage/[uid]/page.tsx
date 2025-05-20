import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSessionUid } from "@/lib/server/auth";
import { getFirestore, FieldPath, Timestamp } from "firebase-admin/firestore";
import "@/lib/firebase";
import TeamScheduleList from "@/app/mypage/[uid]/TeamScheduleList";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface teamType {
  teamName: string;
  members: string[];
  createdAt?: Timestamp;
}

export const revalidate = 0;

export default async function MyPage() {
  const uid = await getSessionUid();
  if (!uid) redirect("/auth/login");

  const db = getFirestore();

  let teams;
  try {
    const teamDocs = await db
      .collection("teams")
      .where("members", "array-contains", uid)
      .get();

    teams = await Promise.all(
      teamDocs.docs.map(async (doc) => {
        const data = doc.data() as teamType;

        const profilesSnap = await db
          .collection("users")
          .where(FieldPath.documentId(), "in", data.members)
          .get();

        const members = profilesSnap.docs.map((memberDoc) => {
          const memberInfo = memberDoc.data() as {
            email: string;
            name: string;
            mobile?: string;
          };
          return {
            uid: memberDoc.id,
            name: memberInfo.name ?? "",
            email: memberInfo.email,
            mobile: memberInfo.mobile ?? "",
          };
        });

        const createdAt =
          data.createdAt instanceof Timestamp
            ? data.createdAt.toMillis()
            : Date.now();

        return {
          id: doc.id,
          teamName: data.teamName,
          createdAt,
          members,
        };
      })
    );
  } catch (error: any) {
    throw new Error(error.status, error.message);
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <TeamScheduleList data={teams!} />
    </Suspense>
  );
}
