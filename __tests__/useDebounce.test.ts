import "@testing-library/jest-dom";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "@/hooks/useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 300));
    expect(result.current).toBe("hello");
  });

  it("debounces updates by the specified delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "initial" } }
    );
    rerender({ value: "updated" });
    expect(result.current).toBe("initial");
    act(() => jest.advanceTimersByTime(300));
    expect(result.current).toBe("updated");
  });

  it("only applies the last value when updated rapidly", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "a" } }
    );
    rerender({ value: "ab" });
    rerender({ value: "abc" });
    rerender({ value: "abcd" });
    act(() => jest.advanceTimersByTime(300));
    expect(result.current).toBe("abcd");
  });
});
