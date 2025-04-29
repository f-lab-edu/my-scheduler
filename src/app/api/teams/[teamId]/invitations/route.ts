import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import "@/lib/firebase";
import nodemailer from "nodemailer";
import { getSessionUid } from "@/lib/server/auth";
// 초대 생성
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ teamId: string }> }
) {
  const { teamId } = await params;

  try {
    const uid = await getSessionUid();
    if (!uid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { emails }: { emails: string[] } = await request.json();
    if (!Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: "초대할 이메일이 없습니다." },
        { status: 400 }
      );
    }

    const db = getFirestore();
    const teamSnap = await db.collection("teams").doc(teamId).get();
    const team = teamSnap.data();
    if (!team?.members?.includes(uid)) {
      return NextResponse.json(
        { error: "초대 권한이 없습니다." },
        { status: 403 }
      );
    }

    const now = Date.now();
    const inviteRef = db
      .collection("teams")
      .doc(teamId)
      .collection("invitations");

    const host = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const batch = db.batch();
    await Promise.all(
      emails.map(async (email) => {
        const ref = inviteRef.doc(); // 초대 id 생성
        const invitationId = ref.id;
        batch.set(ref, {
          inviteeEmail: email,
          uid,
          createdAt: now,
          expiresAt: now + 7 * 24 * 60 * 60 * 1000, // 7일 뒤 만료
          accepted: false,
        });

        const inviteLink = `${host}/invite/${teamId}/${invitationId}/schedule/board`;
        transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: email,
          subject: `${team.teamName} 팀에 초대되었습니다!`,
          html: `
              <h2>My Scheduler - 팀 ${team.teamName}에 초대되었습니다!</h2>
              <p>아래 링크를 클릭하면 팀 보드에 참여할 수 있습니다:</p>
              <p><a href="${inviteLink}">${inviteLink}</a></p>
              <p>이 초대는 발송 후 7일 동안 유효합니다.</p>
           `,
        });
      })
    );
    await batch.commit();
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    if (error.responseCode || error.code === "ECONNECTION") {
      return NextResponse.json(
        { error: "메일 발송에 실패했습니다." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
