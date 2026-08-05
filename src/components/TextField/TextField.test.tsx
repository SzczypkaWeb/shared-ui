import { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { TextField } from "./TextField";

describe("TextField", () => {
  it("forwards the ref to the underlying native input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<TextField ref={ref} placeholder="Name" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(screen.getByPlaceholderText("Name"));
  });

  it("does not render a FormError when no error is passed", () => {
    render(<TextField placeholder="Name" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renders a FormError below the input and marks it invalid when an error is passed", () => {
    render(<TextField placeholder="Email" error="Email is invalid" />);

    expect(screen.getByText("Email is invalid")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute("aria-invalid", "true");
  });

  it("passes through standard native input props", () => {
    render(<TextField placeholder="Age" type="number" disabled />);
    const input = screen.getByPlaceholderText("Age");

    expect(input).toHaveAttribute("type", "number");
    expect(input).toBeDisabled();
  });

  it("defaults to type text", () => {
    render(<TextField placeholder="Name" />);
    expect(screen.getByPlaceholderText("Name")).toHaveAttribute("type", "text");
  });

  it("works directly with react-hook-form's register(), with no Controller wrapper", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    function TestForm() {
      const { register, handleSubmit } = useForm<{ email: string }>();
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField placeholder="Email" {...register("email")} />
          <button type="submit">Submit</button>
        </form>
      );
    }

    render(<TestForm />);

    await user.type(screen.getByPlaceholderText("Email"), "jane@example.com");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ email: "jane@example.com" }),
      expect.anything()
    );
  });
});
