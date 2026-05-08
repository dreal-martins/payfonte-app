import { SearchBar } from "@/components/ui/SearchBar";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

const mockSetSearchQuery = jest.fn();
jest.mock("@/store/appStore", () => ({
  useAppStore: () => ({
    setSearchQuery: mockSetSearchQuery,
  }),
}));

beforeEach(() => {
  mockSetSearchQuery.mockClear();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runAllTimers();
  jest.useRealTimers();
});

describe("SearchBar", () => {
  it("renders with placeholder text", () => {
    render(<SearchBar placeholder="Search…" />);
    expect(screen.getByPlaceholderText("Search…")).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    render(<SearchBar />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Nigeria" } });
    expect(input).toHaveValue("Nigeria");
  });

  it("does not call setSearchQuery immediately on input", () => {
    render(<SearchBar />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Nigeria" } });
    expect(mockSetSearchQuery).not.toHaveBeenCalledWith("Nigeria");
  });

  it("shows clear button when input has value", () => {
    render(<SearchBar />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(screen.getByLabelText("Clear search")).toBeInTheDocument();
  });

  it("clears input when clear button is clicked", () => {
    render(<SearchBar />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(screen.getByLabelText("Clear search"));
    expect(input).toHaveValue("");
  });
});
