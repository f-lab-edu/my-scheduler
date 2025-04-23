import { NextResponse, type NextRequest } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { StatusType } from "@/types/scheduleType";
import "@/lib/firebase";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ teamId: string }> }
) {
  const { teamId } = await params;
  try {
    const snapshot = await getFirestore()
      .collection("teams")
      .doc(teamId)
      .collection("statusList")
      .orderBy("order")
      .get();

    const statusList = snapshot.docs.map((status) => ({
      id: status.id,
      ...(status.data() as StatusType),
    }));

    return NextResponse.json(statusList, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ teamId: string }> }
) {
  const { teamId } = await params;

  let data: StatusType;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { error: "서버 에러가 발생했습니다." },
      { status: 500 }
    );
  }

  try {
    const statusList = getFirestore()
      .collection("teams")
      .doc(teamId)
      .collection("statusList");
    const docRef = await statusList.add(data);
    return NextResponse.json({ id: docRef.id, ...data }, { status: 201 });
  } catch (err) {
    console.error("POST /statusList error", err);
    return NextResponse.json(
      { error: "상태 추가에 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ teamId: string }> }
) {
  const { teamId } = await params;
  let body: { id: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "잘못된 JSON 형식입니다." },
      { status: 400 }
    );
  }

  if (!body.id) {
    return NextResponse.json(
      { error: "삭제할 상태의 id를 전달해야 합니다." },
      { status: 400 }
    );
  }

  try {
    await getFirestore()
      .collection("teams")
      .doc(teamId)
      .collection("statusList")
      .doc(body.id)
      .delete();

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error("DELETE /statusList error", error);
    return NextResponse.json(
      { error: "상태 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
