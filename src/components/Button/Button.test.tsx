import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renders its children as the accessible label", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    await user.click(screen.getByRole("button", { name: "Click me" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Click me
      </Button>
    );

    await user.click(screen.getByRole("button", { name: "Click me" }));

    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Click me" })).toBeDisabled();
  });

  it("defaults to the primary variant and button type", () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole("button", { name: "Default" });
    expect(button).toHaveAttribute("type", "button");
    expect(button.className).toContain("primary");
  });

  it("applies the requested variant and size", () => {
    render(
      <Button variant="secondary" size="small">
        Secondary
      </Button>
    );
    const button = screen.getByRole("button", { name: "Secondary" });
    expect(button.className).toContain("secondary");
    expect(button.className).toContain("small");
  });

  it("supports a custom html type, e.g. submit", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button", { name: "Submit" })).toHaveAttribute("type", "submit");
  });

  it("forwards a custom className alongside its own classes", () => {
    render(<Button className="extra">Styled</Button>);
    expect(screen.getByRole("button", { name: "Styled" }).className).toContain("extra");
  });
});
