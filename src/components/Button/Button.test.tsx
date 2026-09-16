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
    // These assert semantic design-token classes (bg-primary, bg-secondary,
    // ...) rather than hardcoded Tailwind palette classes (bg-blue-600,
    // bg-gray-200, ...), because only the token-backed classes repaint when
    // an ancestor toggles the `.dark` class - see globals.css's `.dark`
    // override block and `@custom-variant dark`.
    it("applies primary variant using semantic design tokens", () => {
      render(<Button variant="primary">Primary</Button>);
      const button = screen.getByRole("button", { name: "Primary" });
      expect(button.className).toEqual(
        expect.stringContaining("bg-primary")
      );
      expect(button.className).toEqual(
        expect.stringContaining("text-primary-foreground")
      );
      expect(button.className).toEqual(
        expect.stringContaining("hover:bg-primary/90")
      );
    });

    it("applies secondary variant using semantic design tokens", () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole("button", { name: "Secondary" });
      expect(button.className).toEqual(
        expect.stringContaining("bg-secondary")
      );
      expect(button.className).toEqual(
        expect.stringContaining("text-secondary-foreground")
      );
      expect(button.className).toEqual(
        expect.stringContaining("hover:bg-secondary/80")
      );
    });

    it("applies ghost variant using semantic design tokens", () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole("button", { name: "Ghost" });
      expect(button.className).toEqual(
        expect.stringContaining("bg-transparent")
      );
      expect(button.className).toEqual(
        expect.stringContaining("hover:bg-accent")
      );
      expect(button.className).toEqual(
        expect.stringContaining("hover:text-accent-foreground")
      );
    });

    it("never renders hardcoded Tailwind palette classes that would not respond to the dark variant", () => {
      const variants = ["primary", "secondary", "ghost"] as const;
      const hardcodedPalettePattern = /\b(?:bg|text|hover:bg|hover:text|active:bg|disabled:bg|disabled:text)-(?:blue|gray|red|green|amber|emerald|slate|zinc|neutral|stone)-\d{2,3}\b/;

      for (const variant of variants) {
        const { unmount } = render(<Button variant={variant}>{variant}</Button>);
        const button = screen.getByRole("button", { name: variant });
        expect(button.className).not.toMatch(hardcodedPalettePattern);
        unmount();
      }
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
      expect(button.className).toContain("bg-primary");
      expect(button.className).toContain("text-primary-foreground");
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
      expect(button.className).toContain("bg-secondary");
      expect(button.className).toContain("text-secondary-foreground");
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
      expect(button.className).toContain("hover:bg-accent");
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
      expect(button.className).toContain("bg-primary");
      expect(button.className).toContain("px-4");
      // And custom class
      expect(button.className).toContain("custom-class");
    });
  });
});
