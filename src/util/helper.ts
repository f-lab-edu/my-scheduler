import { randomBytes } from "crypto";

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
