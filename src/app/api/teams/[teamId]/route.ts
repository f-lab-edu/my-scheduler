import { NextResponse, type NextRequest } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import type { TeamType } from "@/types/teamType";
import "@/lib/firebase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ teamId: string }> }
): Promise<NextResponse> {
  const { teamId } = await params;
  try {
    const snap = await getFirestore().collection("teams").doc(teamId).get();

    if (!snap.exists) {
      return NextResponse.json(
        { error: "팀을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { id: snap.id, ...(snap.data() as TeamType) },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}
