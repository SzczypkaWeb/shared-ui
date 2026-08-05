import { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SubmitButton } from "./SubmitButton";

describe("SubmitButton", () => {
  it("renders its children as the accessible label", () => {
    render(<SubmitButton>Sign in</SubmitButton>);
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("defaults to the submit button type", () => {
    render(<SubmitButton>Sign in</SubmitButton>);
    expect(screen.getByRole("button", { name: "Sign in" })).toHaveAttribute("type", "submit");
  });

  it("is not disabled and shows no spinner by default", () => {
    render(<SubmitButton>Sign in</SubmitButton>);
    const button = screen.getByRole("button", { name: "Sign in" });

    expect(button).not.toBeDisabled();
    expect(screen.queryByTestId("submit-button-spinner")).not.toBeInTheDocument();
  });

  it("disables the button and shows a loading spinner when isLoading is true", () => {
    render(<SubmitButton isLoading>Sign in</SubmitButton>);
    const button = screen.getByRole("button", { name: "Sign in" });

    expect(button).toBeDisabled();
    expect(screen.getByTestId("submit-button-spinner")).toBeInTheDocument();
  });

  it("does not call onClick when isLoading disables the button", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <SubmitButton isLoading onClick={onClick}>
        Sign in
      </SubmitButton>
    );

    await user.click(screen.getByRole("button", { name: "Sign in" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("forwards the ref to the underlying native button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<SubmitButton ref={ref}>Sign in</SubmitButton>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(screen.getByRole("button", { name: "Sign in" }));
  });

  it("forwards a custom className alongside its own classes", () => {
    render(<SubmitButton className="extra">Sign in</SubmitButton>);
    expect(screen.getByRole("button", { name: "Sign in" }).className).toContain("extra");
  });
});
