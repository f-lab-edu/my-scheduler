import { renderHook, act } from "@testing-library/react";
import { useModal } from "@/hooks/useModal";

describe("useModal 훅 테스트", () => {
  let result: { current: any };
  beforeEach(() => {
    const hook = renderHook(() => useModal());
    result = hook.result;
  });

  it("초기 오픈여부의 상태는 false이다", () => {
    // const { result } = renderHook(() => useModal());
    expect(result.current.open).toBe(false);
  });

  it("openModal을 호출하면 open여부는 true가 된다", () => {
    // const { result } = renderHook(() => useModal());
    act(() => result.current.openModal());
    expect(result.current.open).toBe(true);
  });

  it("closeModal을 호출하면 open여부는 false가 된다", () => {
    // const { result } = renderHook(() => useModal());

    act(() => result.current.openModal());
    expect(result.current.open).toBe(true);

    act(() => result.current.closeModal());
    expect(result.current.open).toBe(false);
  });
});
