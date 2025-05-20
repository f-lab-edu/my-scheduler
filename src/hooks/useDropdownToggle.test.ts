import { renderHook, act } from "@testing-library/react";
import { useDropdownToggle, useDropdownApply } from "@/hooks/useDropdown";
import { Priority } from "@/types/scheduleType";

type UseDropdownToggleReturn = ReturnType<typeof useDropdownToggle>;
type UseDropdownApplyReturn = ReturnType<typeof useDropdownApply>;

const HIGH: Priority = "High";
const LOW: Priority = "Low";
const LEFT: number = 345;
const BOTTOM: number = 265;

describe("useDropdownToggle 훅 테스트", () => {
  let current: UseDropdownToggleReturn;
  const mockEvent = {
    currentTarget: {
      getBoundingClientRect: jest.fn(() => ({
        left: LEFT,
        bottom: BOTTOM,
      })),
    },
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    const { result } = renderHook(() => useDropdownToggle());
    current = result.current;
  });

  it("dropdownPosition의 초기 상태는 null이다", () => {
    expect(current.dropdownPosition).toBeNull();
  });

  it("toggleDropdown 호출 시 getBoundingClientRect 값에 따라 dropdownPosition이 설정된다", () => {
    act(() => {
      current.toggleDropdown(mockEvent);
    });

    expect(current.dropdownPosition).toEqual({
      top: BOTTOM,
      left: LEFT,
    }); //bottom을 top에 대입
  });

  it("열려있는 상태에서 toggleDropdown 호출 시 dropdownPosition은 null이 되어 토글된다", () => {
    act(() => {
      current.toggleDropdown(mockEvent);
    });
    expect(current.dropdownPosition).toEqual({
      top: BOTTOM,
      left: LEFT,
    });

    act(() => {
      current.toggleDropdown(mockEvent);
    });
    expect(current.dropdownPosition).toBeNull();
  });
});

describe("useDropdownApply 훅 테스트", () => {
  let current: UseDropdownApplyReturn;
  const onApplyMock = jest.fn();

  const mockEvent = (bottom = BOTTOM, left = LEFT) => {
    return {
      currentTarget: {
        getBoundingClientRect: () => ({ left, bottom }),
      },
    } as any;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    const { result } = renderHook(() =>
      useDropdownApply({ onApply: onApplyMock })
    );
    current = result.current;
  });

  it("openDropdown 호출 시 dropdownPosition이 셋팅되고 togglePriorites가 selectedPriorities로 셋팅된다", () => {
    act(() => {
      current.openDropdown(mockEvent(BOTTOM, LEFT));
    });
    expect(current.dropdownPosition).toEqual({
      top: BOTTOM,
      left: LEFT,
    });
    expect(current.selectedPriorities).toEqual([]);
  });

  it("togglePriority함수 호출시 togglePriorities가 호출되어 토글된다.", () => {
    act(() => current.openDropdown(mockEvent()));
    act(() => current.togglePriority(HIGH));
    expect(current.selectedPriorities).toEqual([HIGH]);

    act(() => current.togglePriority(HIGH));
    expect(current.selectedPriorities).toEqual([]);
  });

  it("applyPriorities 호출 시 onApply에 priorities 문자열이 전달된다", () => {
    act(() => {
      current.openDropdown(mockEvent());
      current.togglePriority(HIGH);
      current.togglePriority(LOW);
      current.applyPriorities();
    });

    expect(onApplyMock).toHaveBeenCalledWith([HIGH, LOW]);
    expect(current.dropdownPosition).toBeNull();
  });
});
