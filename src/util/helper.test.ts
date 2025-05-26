import { generateInviteCode, filterTasksByMonth } from "@/util/helper";

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

const maskTask = (start: string, end: string) => ({
  id: `${start}-${end}`,
  groupId: "",
  title: "",
  start,
  end,
  color: "#000",
});

describe("달별로 task 필더링하기", () => {
  const mockTasks = [
    maskTask("2025-05-01", "2025-05-03"),
    maskTask("2025-04-20", "2025-05-02"),
    maskTask("2025-05-30", "2025-06-02"),
    maskTask("2025-04-10", "2025-04-22"),
    maskTask("2025-06-10", "2025-06-22"),
  ];

  it("2025년 5월에 걸친 이벤트만 반환한다.", () => {
    const result = filterTasksByMonth(mockTasks, 2025, 4);
    expect(result.map((task) => task.id)).toEqual([
      "2025-05-01-2025-05-03",
      "2025-04-20-2025-05-02",
      "2025-05-30-2025-06-02",
    ]);
  });
});
