import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input", () => {
  it("renders a label associated with the input via htmlFor/id", () => {
    render(<Input label="Email" id="email" />);
    const input = screen.getByLabelText("Email");
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe("INPUT");
  });

  it("renders without a label when none is provided", () => {
    render(<Input placeholder="No label" />);
    expect(screen.getByPlaceholderText("No label")).toBeInTheDocument();
  });

  it("calls onChange with the new value when the user types", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input label="Name" onChange={onChange} />);

    await user.type(screen.getByLabelText("Name"), "abc");

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(screen.getByLabelText("Name")).toHaveValue("abc");
  });

  it("respects the disabled prop and blocks input", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input label="Disabled field" onChange={onChange} disabled />);

    const input = screen.getByLabelText("Disabled field");
    expect(input).toBeDisabled();

    await user.type(input, "x");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("supports controlled value updates", () => {
    const { rerender } = render(<Input label="Controlled" value="a" onChange={() => {}} />);
    expect(screen.getByLabelText("Controlled")).toHaveValue("a");

    rerender(<Input label="Controlled" value="b" onChange={() => {}} />);
    expect(screen.getByLabelText("Controlled")).toHaveValue("b");
  });

  it("displays an error message and marks the input as invalid", () => {
    render(<Input label="Username" error="Username is required" />);
    expect(screen.getByText("Username is required")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toHaveAttribute("aria-invalid", "true");
  });

  it("defaults the html type to text and allows overriding it", () => {
    render(<Input label="Password" type="password" />);
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
  });
});
