import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getFirestore } from "firebase-admin/firestore";
import { getSessionUid } from "@/lib/server/auth";
import { generateInviteCode } from "@/util/helper";

export async function POST(request: Request) {
  try {
    const { teamName, inviteeEmail } = await request.json();
    const inviterUid = await getSessionUid();
    if (!inviterUid) {
      return NextResponse.json({ error: "unaythorized" }, { status: 401 });
    }

    const db = getFirestore();
    const code = generateInviteCode(teamName);

    // 팀 생성
    await db
      .collection("teams")
      .doc(code)
      .set({
        teamName,
        createdBy: inviterUid,
        members: [inviterUid],
        createdAt: Date.now(),
      });
    const teamId = code;

    // 초대 코드
    const now = Date.now();
    await db
      .collection("invitations")
      .doc(code)
      .set({
        teamId,
        inviterUid,
        inviteeEmail,
        code,
        createdAt: now,
        expiresAt: now + 7 * 24 * 60 * 60 * 1000,
        accepted: false,
      });

    // 발송
    const host = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
    const inviteLink = `${host}/invite/${code}/schedule/board`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: inviteeEmail,
      subject: `${teamName}팀에 초대되었습니다!`,
      html: `
          <h2>My Scheduler, 팀 ${teamName}에 초대되었습니다:D</h2>
          <p>아래 링크를 클릭하면 <strong>${teamName}</strong> 팀 보드에 참여할 수 있습니다:</p>
          <p><a href="${inviteLink}">${inviteLink}</a></p>
          <p>링크의 유효기간은 발송 후 7일입니다.</p>
        `,
    });

    return NextResponse.json({ teamId: code, inviteLink });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "서버 에러가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
