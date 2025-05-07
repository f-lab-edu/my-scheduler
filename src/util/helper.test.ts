import { generateInviteCode } from "@/util/helper";

jest.mock("crypto", () => ({
  randomBytes: jest.fn(() => Buffer.from("123456789012", "hex")),
}));

describe("초대코드 생성하기", () => {
  it("한글,공백,특수문자 섞인 팀명을 slug로 변환한다.", () => {
    const code = generateInviteCode("로또 당 to the 첨!! 팀");
    // 디코딩 구조 => slug:rand
    const decoded = Buffer.from(code, "base64url").toString();
    expect(decoded).toBe("to-the:123456789012");
  });

  it("random은 hex 12글자이다", () => {
    const code = generateInviteCode("연금복 권 check!!! 팀");
    const decoded = Buffer.from(code, "base64url").toString();
    const rand = decoded.split(":")[1];
    expect(rand).toHaveLength(12);
  });

  it("출력은 base64 url 형식이다", () => {
    const code = generateInviteCode("빠르게 spee또 팀");
    expect(code).toMatch(/^[A-Za-z0-9_-]+$/);
  });
});
