import { renderHook, act } from "@testing-library/react";
import { useDropdownToggle, useDropdownApply } from "@/hooks/useDropdown";
import { Priority } from "@/types/scheduleType";

const HIGH: Priority = "High";
const LOW: Priority = "Low";

describe("useDropdownToggle 훅 테스트", () => {
  let result: { current: any };

  const mockEvent = {
    currentTarget: {
      getBoundingClientRect: jest.fn(() => ({
        left: 345,
        bottom: 265,
      })),
    },
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    const hook = renderHook(() => useDropdownToggle());
    result = hook.result;
  });

  it("dropdownPosition의 초기 상태는 null이다", () => {
    const { result } = renderHook(() => useDropdownToggle());
    expect(result.current.dropdownPosition).toBeNull();
  });

  it("toggleDropdown 호출 시 getBoundingClientRect 값에 따라 dropdownPosition이 설정된다", () => {
    act(() => {
      result.current.toggleDropdown(mockEvent);
    });

    expect(result.current.dropdownPosition).toEqual({ top: 265, left: 345 }); //bottom을 top에 대입
  });

  it("열려있는 상태에서 toggleDropdown 호출 시 dropdownPosition은 null이 되어 토글된다", () => {
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

describe("useDropdownApply 훅 테스트", () => {
  let result: { current: any };
  const onApplyMock = jest.fn();

  const mockEvent = (bottom = 100, left = 50) => {
    return {
      currentTarget: {
        getBoundingClientRect: () => ({ left, bottom }),
      },
    } as any;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    const hook = renderHook(() => useDropdownApply({ onApply: onApplyMock }));
    result = hook.result;
  });

  it("초기상태의 dropdownPosition은 null, selectedPriorities는 빈 배열이다", () => {
    expect(result.current.dropdownPosition).toBeNull();
    expect(result.current.selectedPriorities).toEqual([]);
    expect(onApplyMock).not.toHaveBeenCalled();
  });

  it("openDropdown 호출 시 dropdownPosition이 셋팅되고 togglePriorites가 selectedPriorities로 셋팅된다", () => {
    act(() => {
      result.current.openDropdown(mockEvent(120, 80));
    });
    expect(result.current.dropdownPosition).toEqual({ top: 120, left: 80 });
    expect(result.current.selectedPriorities).toEqual([]);
  });

  it("togglePriority함수 호출시 togglePriorities가 호출되어 토글된다.", () => {
    act(() => result.current.openDropdown(mockEvent()));
    act(() => result.current.togglePriority(HIGH));
    expect(result.current.selectedPriorities).toEqual([HIGH]);

    act(() => result.current.togglePriority(HIGH));
    expect(result.current.selectedPriorities).toEqual([]);
  });

  it("applyPriorities 호출 시 onApply에 priorities 문자열이 전달된다", () => {
    act(() => result.current.openDropdown(mockEvent()));

    act(() => {
      result.current.togglePriority(HIGH);
      result.current.togglePriority(LOW);
    });
    act(() => result.current.applyPriorities());
    expect(onApplyMock).toHaveBeenCalledWith([HIGH, LOW]);
    expect(result.current.dropdownPosition).toBeNull();
  });
});
