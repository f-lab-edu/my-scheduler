import { renderHook, act } from "@testing-library/react";
import { useDropdownToggle } from "@/hooks/useDropdown";

describe("useDropdownToggle 훅 테스트", () => {
  it("dropdownPosition의 초기 상태는 null이다", () => {
    const { result } = renderHook(() => useDropdownToggle());
    expect(result.current.dropdownPosition).toBeNull();
  });

  it("toggleDropdown 호출 시 getBoundingClientRect 값에 따라 dropdownPosition이 설정된다", () => {
    const { result } = renderHook(() => useDropdownToggle());
    const mockEvent = {
      currentTarget: {
        getBoundingClientRect: jest.fn(() => ({
          left: 345,
          bottom: 265,
        })),
      },
    } as any;

    act(() => {
      result.current.toggleDropdown(mockEvent);
    });

    expect(result.current.dropdownPosition).toEqual({ top: 265, left: 345 }); //bottom을 top에 대입
  });

  it("열려있는 상태에서 toggleDropdown 호출 시 dropdownPosition은 null이 되어 토글된다", () => {
    const { result } = renderHook(() => useDropdownToggle());
    const mockEvent = {
      currentTarget: {
        getBoundingClientRect: jest.fn(() => ({
          left: 345,
          bottom: 265,
        })),
      },
    } as any;

    act(() => {
      result.current.toggleDropdown(mockEvent);
    });
    expect(result.current.dropdownPosition).toEqual({ top: 265, left: 345 });

    act(() => {
      result.current.toggleDropdown(mockEvent);
    });
    expect(result.current.dropdownPosition).toBeNull();
  });
});
