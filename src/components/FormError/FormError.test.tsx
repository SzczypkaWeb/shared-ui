import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormError } from "./FormError";

describe("FormError", () => {
  it("renders the error message when one is provided", () => {
    render(<FormError message="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("renders nothing (no element with layout impact) when no message is provided", () => {
    const { container } = render(<FormError />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when the message is an empty string", () => {
    const { container } = render(<FormError message="" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("exposes the message with an alert role for accessibility", () => {
    render(<FormError message="Invalid email" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
  });
});
