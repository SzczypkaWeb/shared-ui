import { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { PasswordField } from "./PasswordField";

describe("PasswordField", () => {
  it("renders a native input with type=password", () => {
    render(<PasswordField placeholder="Password" />);
    expect(screen.getByPlaceholderText("Password")).toHaveAttribute("type", "password");
  });

  it("forwards the ref to the underlying native input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<PasswordField ref={ref} placeholder="Password" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(screen.getByPlaceholderText("Password"));
  });

  it("does not hardcode autoComplete: it passes through whatever value the caller provides", () => {
    const { rerender } = render(<PasswordField placeholder="Password" autoComplete="current-password" />);
    expect(screen.getByPlaceholderText("Password")).toHaveAttribute("autocomplete", "current-password");

    rerender(<PasswordField placeholder="Password" autoComplete="new-password" />);
    expect(screen.getByPlaceholderText("Password")).toHaveAttribute("autocomplete", "new-password");
  });

  it("renders a FormError below the input when an error is passed", () => {
    render(<PasswordField placeholder="Password" error="Password is too short" />);

    expect(screen.getByText("Password is too short")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toHaveAttribute("aria-invalid", "true");
  });

  it("does not render a FormError when no error is passed", () => {
    render(<PasswordField placeholder="Password" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("works directly with react-hook-form's register(), with no Controller wrapper", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    function TestForm() {
      const { register, handleSubmit } = useForm<{ password: string }>();
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <PasswordField placeholder="Password" autoComplete="current-password" {...register("password")} />
          <button type="submit">Submit</button>
        </form>
      );
    }

    render(<TestForm />);

    await user.type(screen.getByPlaceholderText("Password"), "hunter2");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ password: "hunter2" }),
      expect.anything()
    );
  });
});
