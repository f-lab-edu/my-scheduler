import { getSessionUid } from "@/lib/server/auth";
import { getFirestore } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ teamId: string }> }
) {
  const { teamId } = await params;

  try {
    const inviterUid = await getSessionUid();
    if (!inviterUid) {
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
    if (!team?.members?.includes(inviterUid)) {
      return NextResponse.json(
        { error: "초대 권한이 없습니다." },
        { status: 403 }
      );
    }

    const now = Date.now();
    const batch = db.batch();
    const inviteRef = db
      .collection("teams")
      .doc(teamId)
      .collection("invitations");

    emails.forEach((email) => {
      const ref = inviteRef.doc(); // 초대 id 생성
      batch.set(ref, {
        inviteeEmail: email,
        inviterUid,
        createdAt: now,
        expiresAt: now + 7 * 24 * 60 * 60 * 1000, // 7일 뒤 만료
        accepted: false,
      });
    });
    await batch.commit();

    const host = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
    const inviteLink = `${host}/invite/${teamId}/schedule/board`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await Promise.all(
      emails.map((email) =>
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
        })
      )
    );
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
