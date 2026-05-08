import "@testing-library/jest-dom";
import { debounce } from "@/lib/utils";

describe("debounce", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("delays function execution", () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 300);
    debounced();
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("cancels previous call on rapid calls", () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 300);
    debounced();
    debounced();
    debounced();
    jest.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe("debounce", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("delays function execution", () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 300);
    debounced();
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("cancels previous call on rapid calls", () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 300);
    debounced();
    debounced();
    debounced();
    jest.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
