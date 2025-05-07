import { NextResponse, NextRequest } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { getRtdb } from "@/lib/realtimeDb";
import "@/lib/firebase";
import { TaskType } from "@/types/scheduleType";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ teamId: string }> }
) {
  const { teamId } = await params;
  try {
    const snapshot = await getFirestore()
      .collection("teams")
      .doc(teamId)
      .collection("tasks")
      .get();
    const taskList = snapshot.docs.map((task) => ({
      ...(task.data() as TaskType),
      id: task.id,
    }));

    return NextResponse.json(taskList, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "작업 목록 조회에 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ teamId: string }> }
) {
  const { teamId } = await params;
  try {
    const data = (await request.json()) as Omit<TaskType, "id">;
    const task = getFirestore()
      .collection("teams")
      .doc(teamId)
      .collection("tasks");
    const docRef = await task.add(data);

    const rtDb = getRtdb();
    await rtDb.ref(`teams/${teamId}/tasks/${docRef.id}`).set({
      ...data,
      id: docRef.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return NextResponse.json({ id: docRef.id, ...data }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "잘못된 JSON 형식입니다." },
      { status: 400 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ teamId: string }> }
) {
  const { teamId } = await params;

  let body: TaskType;
  try {
    body = (await request.json()) as TaskType;
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "잘못된 JSON 형식입니다." },
      { status: 400 }
    );
  }

  const { id, ...data } = body;
  if (!id) {
    return NextResponse.json(
      {
        error: "업데이트할 task의 id가 필요합니다.",
      },
      { status: 400 }
    );
  }

  try {
    await getFirestore()
      .collection("teams")
      .doc(teamId)
      .collection("tasks")
      .doc(id)
      .set(data);

    await getRtdb().ref(`teams/${teamId}/tasks/${id}`).update(data);

    return NextResponse.json(null, { status: 204 });
  } catch (error: any) {
    console.error("PATCH /tasks error", error);
    return NextResponse.json(
      { error: "Task 업데이트에 실패했습니다." },
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
  } catch (error: any) {
    console.error(error);
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
      .collection("tasks")
      .doc(body.id)
      .delete();

    await getRtdb().ref(`teams/${teamId}/tasks/${body.id}`).remove();

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error("DELETE /task error", error);
    return NextResponse.json(
      { error: "상태 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
