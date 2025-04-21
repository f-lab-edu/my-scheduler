// import { NextResponse, type NextRequest } from "next/server";
// import { getFirestore } from "firebase-admin/firestore";
// import { StatusType } from "@/types/scheduleType";
// import "@/lib/firebase";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: Promise<{ teamId: string }> }
// ): Promise<NextResponse> {
//   const { teamId } = await params;
//   try {
//     const snapshot = await getFirestore()
//       .collection("teams")
//       .doc(teamId)
//       .collection("statusList")
//       .get();

//     const statusList = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...(doc.data() as StatusType),
//     }));

//     return NextResponse.json(statusList, { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "서버 에러가 발생했습니다." },
//       { status: 500 }
//     );
//   }
// }

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
