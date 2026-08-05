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

  it("supports a custom html type, e.g. submit", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button", { name: "Submit" })).toHaveAttribute("type", "submit");
  });

  it("forwards a custom className alongside its own classes", () => {
    render(<Button className="extra">Styled</Button>);
    expect(screen.getByRole("button", { name: "Styled" }).className).toContain("extra");
  });

  describe("Tailwind variant classes", () => {
    it("applies primary variant as a literal Tailwind class string", () => {
      render(<Button variant="primary">Primary</Button>);
      const button = screen.getByRole("button", { name: "Primary" });
      // Verify the exact literal class string for primary variant
      expect(button.className).toEqual(
        expect.stringContaining("bg-blue-600")
      );
      expect(button.className).toEqual(
        expect.stringContaining("text-white")
      );
      expect(button.className).toEqual(
        expect.stringContaining("hover:bg-blue-700")
      );
    });

    it("applies secondary variant as a literal Tailwind class string", () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole("button", { name: "Secondary" });
      // Verify the exact literal class string for secondary variant
      expect(button.className).toEqual(
        expect.stringContaining("bg-gray-200")
      );
      expect(button.className).toEqual(
        expect.stringContaining("text-gray-900")
      );
      expect(button.className).toEqual(
        expect.stringContaining("hover:bg-gray-300")
      );
    });

    it("applies ghost variant as a literal Tailwind class string", () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole("button", { name: "Ghost" });
      // Verify the exact literal class string for ghost variant
      expect(button.className).toEqual(
        expect.stringContaining("bg-transparent")
      );
      expect(button.className).toEqual(
        expect.stringContaining("text-gray-700")
      );
      expect(button.className).toEqual(
        expect.stringContaining("hover:bg-gray-100")
      );
    });
  });

  describe("Tailwind size classes", () => {
    it("applies small size as a literal Tailwind class string", () => {
      render(<Button size="small">Small</Button>);
      const button = screen.getByRole("button", { name: "Small" });
      // Verify the exact literal class string for small size
      expect(button.className).toEqual(
        expect.stringContaining("px-3")
      );
      expect(button.className).toEqual(
        expect.stringContaining("py-1")
      );
      expect(button.className).toEqual(
        expect.stringContaining("text-sm")
      );
    });

    it("applies medium size as a literal Tailwind class string", () => {
      render(<Button size="medium">Medium</Button>);
      const button = screen.getByRole("button", { name: "Medium" });
      // Verify the exact literal class string for medium size
      expect(button.className).toEqual(
        expect.stringContaining("px-4")
      );
      expect(button.className).toEqual(
        expect.stringContaining("py-2")
      );
      expect(button.className).toEqual(
        expect.stringContaining("text-base")
      );
    });

    it("applies large size as a literal Tailwind class string", () => {
      render(<Button size="large">Large</Button>);
      const button = screen.getByRole("button", { name: "Large" });
      // Verify the exact literal class string for large size
      expect(button.className).toEqual(
        expect.stringContaining("px-6")
      );
      expect(button.className).toEqual(
        expect.stringContaining("py-3")
      );
      expect(button.className).toEqual(
        expect.stringContaining("text-lg")
      );
    });
  });

  describe("defaults", () => {
    it("defaults to primary variant and medium size with button type", () => {
      render(<Button>Default</Button>);
      const button = screen.getByRole("button", { name: "Default" });
      expect(button).toHaveAttribute("type", "button");
      // Primary variant classes
      expect(button.className).toContain("bg-blue-600");
      expect(button.className).toContain("text-white");
      // Medium size classes
      expect(button.className).toContain("px-4");
      expect(button.className).toContain("py-2");
    });
  });

  describe("variant and size combinations", () => {
    it("applies secondary variant with small size", () => {
      render(
        <Button variant="secondary" size="small">
          Secondary Small
        </Button>
      );
      const button = screen.getByRole("button", { name: "Secondary Small" });
      // Secondary variant
      expect(button.className).toContain("bg-gray-200");
      expect(button.className).toContain("text-gray-900");
      // Small size
      expect(button.className).toContain("px-3");
      expect(button.className).toContain("py-1");
    });

    it("applies ghost variant with large size", () => {
      render(
        <Button variant="ghost" size="large">
          Ghost Large
        </Button>
      );
      const button = screen.getByRole("button", { name: "Ghost Large" });
      // Ghost variant
      expect(button.className).toContain("bg-transparent");
      expect(button.className).toContain("text-gray-700");
      // Large size
      expect(button.className).toContain("px-6");
      expect(button.className).toContain("py-3");
    });
  });

  describe("custom className merging", () => {
    it("merges custom className with variant and size classes", () => {
      render(
        <Button className="custom-class">
          Styled
        </Button>
      );
      const button = screen.getByRole("button", { name: "Styled" });
      // Should contain base classes
      expect(button.className).toContain("bg-blue-600");
      expect(button.className).toContain("px-4");
      // And custom class
      expect(button.className).toContain("custom-class");
    });
  });
});
