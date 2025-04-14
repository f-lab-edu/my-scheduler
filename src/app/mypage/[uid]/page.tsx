import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "firebase-admin/auth";

export default async function MyPage({ params }: { params: { uid: string } }) {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get("session")?.value;

  if (!sessionCookie) {
    redirect("/404");
  }
  let decodedToken;
  try {
    decodedToken = await getAuth().verifySessionCookie(sessionCookie, true);
  } catch (error) {
    console.log(error);
    redirect("/404");
  }

  if (decodedToken.uid !== params.uid) {
    // TODO: 권한 없음 페이지 생성
    redirect("/404");
  }

  // TODO: 인증된 사용자의 팀(혹은 개인)스케줄 데이터 조회
  // const scheduleData = await getScheduleData(decodedToken.uid);

  return (
    <div>
      <h1>My Page for {decodedToken.uid}</h1>
      <h2>Your Schedules</h2>
      {/* TODO: ui */}
    </div>
  );
}
