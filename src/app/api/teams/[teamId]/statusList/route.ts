import { NextResponse, type NextRequest } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import type { TeamType } from "@/types/teamType";
import "@/lib/firebase";
import { StatusType } from "@/types/scheduleType";

interface Props {
  params: { teamId: string };
}

export async function GET(_req: NextRequest, { params }: Props) {
  const { teamId } = params;
  try {
    const snapshot = await getFirestore()
      .collection("teams")
      .doc(teamId)
      .collection("statusList")
      .get();

    const statusList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as StatusType),
    }));

    return NextResponse.json(statusList, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}
