import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CountryCard } from "@/components/countries/CountryCard";
import { Country } from "@/types/country";

const mockCountry: Country = {
  countryName: "Nigeria",
  countryCode: "NG",
  currency: "NGN",
  currencyCode: "en-NG",
};

describe("CountryCard", () => {
  it("renders country name", () => {
    render(
      <CountryCard country={mockCountry} onClick={jest.fn()} locale="en-US" />,
    );
    expect(screen.getByText("Nigeria")).toBeInTheDocument();
  });

  it("renders country code", () => {
    render(
      <CountryCard country={mockCountry} onClick={jest.fn()} locale="en-US" />,
    );
    expect(screen.getByText("NG")).toBeInTheDocument();
  });

  it("renders currency chip", () => {
    render(
      <CountryCard country={mockCountry} onClick={jest.fn()} locale="en-US" />,
    );
    expect(screen.getByText("NGN")).toBeInTheDocument();
  });

  it("calls onClick with the country when clicked", () => {
    const onClick = jest.fn();
    render(
      <CountryCard country={mockCountry} onClick={onClick} locale="en-US" />,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledWith(mockCountry);
  });

  it("has accessible aria-label", () => {
    render(
      <CountryCard country={mockCountry} onClick={jest.fn()} locale="en-US" />,
    );
    expect(
      screen.getByLabelText("View details for Nigeria"),
    ).toBeInTheDocument();
  });
});
