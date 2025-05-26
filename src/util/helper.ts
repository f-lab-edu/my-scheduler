import { CalendarEventType } from "@/types/scheduleType";
import { randomBytes } from "crypto";
import dayjs from "dayjs";

export function generateInviteCode(teamName: string) {
  /**
   * 팀명에 한글·공백·특수문자가 섞여 있더라도 “영숫자 + 하이픈” 형태의
   * URL 안전한 식별자(slug) 로 변환
   */
  const slug = teamName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const rand = randomBytes(6).toString("hex");
  /** 
     합친 문자열을 바이트 시퀀스로 변환해 Buffer 객체 생성
    -> Buffer 내용을 Base64 URL-safe 인코딩으로 변환
   */
  const combined = Buffer.from(`${slug}:${rand}`).toString("base64url");
  return combined;
}

export function filterTasksByMonth(
  tasks: CalendarEventType[],
  year: number,
  month: number
) {
  const monthStart = dayjs(`${year}-${month + 1}-01`);
  const nextMonthStart = monthStart.add(1, "month");

  return tasks.filter((task) => {
    const taskStart = dayjs(task.start);
    const taskEnd = dayjs(task.end);

    return taskStart.isBefore(nextMonthStart) && taskEnd.isAfter(monthStart);
  });
}
