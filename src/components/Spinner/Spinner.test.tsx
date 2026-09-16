import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("renders a loading indicator", () => {
    render(<Spinner />);
    // The spinner itself should be present (the div with border animation)
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders visually hidden text for screen readers by default", () => {
    render(<Spinner />);
    // Should have sr-only hidden text with "Loading..." message
    const srText = screen.getByText("Loading...");
    expect(srText).toHaveClass("sr-only");
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders custom label text when provided", () => {
    render(<Spinner label="Checking PR status..." />);
    expect(screen.getByText("Checking PR status...")).toBeInTheDocument();
  });

  it("applies the animate-spin class for animation", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status").querySelector("div");
    expect(spinner?.className).toContain("animate-spin");
  });

  it("uses semantic border color tokens for dark mode support", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status").querySelector("div");
    // Should use border-muted for track (light border)
    expect(spinner?.className).toContain("border-muted");
    // Should use border-t-primary for the animated edge
    expect(spinner?.className).toContain("border-t-primary");
  });

  it("never uses hardcoded Tailwind palette classes that would not respond to the dark variant", () => {
    const sizes = ["small", "medium", "large"] as const;
    const hardcodedPalettePattern = /\b(?:border|border-t)-(?:blue|gray|red|green|amber|emerald|slate|zinc|neutral|stone)-\d{2,3}\b/;

    for (const size of sizes) {
      const { unmount } = render(<Spinner size={size} />);
      const spinner = screen.getByRole("status").querySelector("div");
      expect(spinner?.className).not.toMatch(hardcodedPalettePattern);
      unmount();
    }
  });

  describe("size variants", () => {
    it("renders with small size", () => {
      render(<Spinner size="small" />);
      const spinner = screen.getByRole("status").querySelector("div");
      expect(spinner?.className).toContain("w-4");
      expect(spinner?.className).toContain("h-4");
    });

    it("renders with medium size (default)", () => {
      render(<Spinner size="medium" />);
      const spinner = screen.getByRole("status").querySelector("div");
      expect(spinner?.className).toContain("w-6");
      expect(spinner?.className).toContain("h-6");
    });

    it("renders with large size", () => {
      render(<Spinner size="large" />);
      const spinner = screen.getByRole("status").querySelector("div");
      expect(spinner?.className).toContain("w-8");
      expect(spinner?.className).toContain("h-8");
    });

    it("defaults to medium size when not specified", () => {
      render(<Spinner />);
      const spinner = screen.getByRole("status").querySelector("div");
      expect(spinner?.className).toContain("w-6");
      expect(spinner?.className).toContain("h-6");
    });
  });

  describe("layout", () => {
    it("renders as a circular border (square with rounded border)", () => {
      render(<Spinner />);
      const spinner = screen.getByRole("status").querySelector("div");
      // circular border means rounded-full
      expect(spinner?.className).toContain("rounded-full");
      // and a border
      expect(spinner?.className).toContain("border");
    });
  });

  describe("accessibility", () => {
    it("has role status for screen readers to announce it's a live region", () => {
      render(<Spinner />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("renders label text in sr-only to be announced by screen readers", () => {
      render(<Spinner label="Processing..." />);
      const srText = screen.getByText("Processing...");
      expect(srText).toHaveClass("sr-only");
    });
  });
});
