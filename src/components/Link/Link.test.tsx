import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Link } from "./Link";

describe("Link", () => {
  it("renders as an anchor element", () => {
    render(<Link href="https://example.com">Example</Link>);
    const link = screen.getByRole("link", { name: "Example" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("renders its children as the link text", () => {
    render(<Link href="/dashboard">Dashboard</Link>);
    expect(screen.getByRole("link", { name: "Dashboard" })).toBeInTheDocument();
  });

  it("uses semantic text color tokens for dark mode support", () => {
    render(<Link href="/page">Click here</Link>);
    const link = screen.getByRole("link", { name: "Click here" });
    expect(link.className).toContain("text-primary");
    expect(link.className).toContain("hover:underline");
  });

  it("never uses hardcoded Tailwind palette classes for text that would not respond to the dark variant", () => {
    const hardcodedPalettePattern = /\b(?:text|hover:text)-(?:blue|gray|red|green|amber|emerald|slate|zinc|neutral|stone)-\d{2,3}\b/;

    render(<Link href="/page">Link</Link>);
    const link = screen.getByRole("link", { name: "Link" });
    expect(link.className).not.toMatch(hardcodedPalettePattern);
  });

  describe("internal links (external=false)", () => {
    it("does not set target or rel attributes by default", () => {
      render(
        <Link href="/internal-page" external={false}>
          Internal
        </Link>
      );
      const link = screen.getByRole("link", { name: "Internal" });
      expect(link).not.toHaveAttribute("target");
      expect(link).not.toHaveAttribute("rel");
    });

    it("does not render an external link icon for internal links", () => {
      const { container } = render(
        <Link href="/page" external={false}>
          Internal Link
        </Link>
      );
      // Should not have an SVG child for external icon
      const svgs = container.querySelectorAll("svg");
      expect(svgs.length).toBe(0);
    });
  });

  describe("external links (external=true)", () => {
    it("sets target=_blank when external=true", () => {
      render(
        <Link href="https://example.com" external={true}>
          External
        </Link>
      );
      const link = screen.getByRole("link", { name: "External" });
      expect(link).toHaveAttribute("target", "_blank");
    });

    it("sets rel=noreferrer noopener when external=true", () => {
      render(
        <Link href="https://github.com" external={true}>
          GitHub
        </Link>
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("rel", "noreferrer noopener");
    });

    it("renders an external link icon after the children", () => {
      const { container } = render(
        <Link href="https://example.com" external={true}>
          External Link
        </Link>
      );
      const link = screen.getByRole("link", { name: "External Link" });
      const svg = link.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("renders the icon as an inline element after the text", () => {
      const { container } = render(
        <Link href="https://example.com" external={true}>
          Visit site
        </Link>
      );
      const link = screen.getByRole("link");
      // SVG should be a child of the link
      expect(link.querySelector("svg")).toBeInTheDocument();
      // Text should come before the SVG
      const children = Array.from(link.childNodes);
      const textNode = children.find((node) => node.nodeType === 3);
      const svgNode = children.find((node) => node.nodeName === "svg");
      if (textNode && svgNode) {
        expect(children.indexOf(textNode)).toBeLessThan(children.indexOf(svgNode));
      }
    });

    it("renders external link icon with appropriate styling", () => {
      const { container } = render(
        <Link href="https://example.com" external={true}>
          External
        </Link>
      );
      const svg = container.querySelector("svg");
      // Icon should be rendered with the correct attributes
      expect(svg).toBeInTheDocument();
      // Verify icon has appropriate inline styling classes via getAttribute
      const classAttr = svg?.getAttribute("class");
      expect(classAttr).toContain("ml-1");
      expect(classAttr).toContain("inline");
    });
  });

  it("forwards HTML anchor attributes", () => {
    render(
      <Link href="/page" data-testid="my-link" title="My Link">
        Link
      </Link>
    );
    const link = screen.getByTestId("my-link");
    expect(link).toHaveAttribute("title", "My Link");
  });

  it("forwards custom className alongside its own classes", () => {
    render(
      <Link href="/page" className="custom-class">
        Link
      </Link>
    );
    const link = screen.getByRole("link", { name: "Link" });
    expect(link.className).toContain("custom-class");
    expect(link.className).toContain("text-primary");
  });

  it("accepts any ReactNode as children, including complex content", () => {
    render(
      <Link href="/docs">
        <span>Learn more</span> in our docs
      </Link>
    );
    expect(screen.getByText("Learn more")).toBeInTheDocument();
    expect(screen.getByText("in our docs", { exact: false })).toBeInTheDocument();
  });
});
