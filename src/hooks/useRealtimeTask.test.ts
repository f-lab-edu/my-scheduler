import { renderHook, act } from "@testing-library/react";
import { useRealtimeTask } from "@/hooks/useRealtimeTask";
import {
  ref,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  off,
  DataSnapshot,
} from "firebase/database";

jest.mock("firebase/database", () => ({
  ref: jest.fn(),
  onChildAdded: jest.fn(),
  onChildChanged: jest.fn(),
  onChildRemoved: jest.fn(),
  off: jest.fn(),
}));

jest.mock("@/lib/firebaseClient", () => {
  return { rtDb: {} };
});

describe("useRealtimeTask 훅 테스트", () => {
  let result: { current: any };

  let handleAdd: (snap: DataSnapshot) => void;
  let handleChange: (snap: DataSnapshot) => void;
  let handleRemove: (snap: DataSnapshot) => void;
  const fakeRef = {};

  beforeEach(() => {
    jest.clearAllMocks();
    (ref as jest.Mock).mockReturnValue(fakeRef);
    (onChildAdded as jest.Mock).mockImplementation((r, fn) => (handleAdd = fn));
    (onChildChanged as jest.Mock).mockImplementation(
      (r, fn) => (handleChange = fn)
    );
    (onChildRemoved as jest.Mock).mockImplementation(
      (r, fn) => (handleRemove = fn)
    );

    const hook = renderHook(() => useRealtimeTask("team123"));
    result = hook.result;
  });

  it("초기에 빈 배열을 반환한다", () => {
    expect(result.current).toEqual([]);
  });

  it("onChildAdded 호출 시 아이템이 추가된다", () => {
    const snap = {
      key: "id123",
      val: () => ({
        id: "abcabcabcacb",
        order: 5,
        priority: "High",
      }),
    } as DataSnapshot;

    act(() => handleAdd(snap));
    expect(result.current).toEqual([
      {
        id: "abcabcabcacb",
        order: 5,
        priority: "High",
      },
    ]);
  });

  it("onChildChanged 호출 시 기존 아이템이 업데이트된다", () => {
    const snap1 = {
      key: "id1",
      val: () => ({ id: "asdasdasdasd", order: 6, priority: "High" }),
    } as unknown as DataSnapshot;

    act(() => handleChange(snap1));
    expect(result.current).toEqual([
      {
        id: "asdasdasdasd",
        order: 6,
        priority: "High",
      },
    ]);

    const snap2 = {
      key: "id1",
      val: () => ({ id: "asdasdasdasd", order: 6, priority: "Low" }),
    } as unknown as DataSnapshot;
    act(() => handleChange(snap2));
    expect(result.current).toEqual([
      {
        id: "asdasdasdasd",
        order: 6,
        priority: "Low",
      },
    ]);
  });

  it("onChildDelete 호출 시 기존 아이템이 삭제된다", () => {
    const snap3 = {
      key: "id3",
      val: () => ({ id: "aaadddsssfff", order: 2, priority: "Medium" }),
    } as unknown as DataSnapshot;

    act(() => handleRemove(snap3));
    expect(result.current).toEqual([]);
  });

  it("언마운트 시 off 호출로 리스너를 해제한다", () => {
    const { unmount } = renderHook(() => useRealtimeTask("team123"));
    unmount();
    expect(off).toHaveBeenCalledWith(fakeRef, "child_added", handleAdd);
    expect(off).toHaveBeenCalledWith(fakeRef, "child_changed", handleChange);
    expect(off).toHaveBeenCalledWith(fakeRef, "child_removed", handleRemove);
  });
});
