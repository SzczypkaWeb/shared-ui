import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SidePanel } from "./SidePanel";

describe("SidePanel", () => {
  it("renders its children", () => {
    render(
      <SidePanel>
        <p>Panel content</p>
      </SidePanel>
    );
    expect(screen.getByText("Panel content")).toBeInTheDocument();
  });

  it("renders an optional title as a heading", () => {
    render(<SidePanel title="Panel Title">Content</SidePanel>);
    expect(screen.getByRole("heading", { name: "Panel Title" })).toBeInTheDocument();
  });

  it("does not render a heading when no title is given", () => {
    render(<SidePanel>Content</SidePanel>);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("forwards a custom className alongside its own classes", () => {
    const { container } = render(<SidePanel className="extra">Content</SidePanel>);
    expect(container.firstElementChild?.className).toContain("extra");
  });

  describe("Layout and dimensions", () => {
    it("applies fixed width of w-72 (288px) to the root container", () => {
      const { container } = render(<SidePanel>Content</SidePanel>);
      const root = container.firstElementChild;
      expect(root?.className).toEqual(expect.stringContaining("w-72"));
    });

    it("applies full height (h-full) to the root container", () => {
      const { container } = render(<SidePanel>Content</SidePanel>);
      const root = container.firstElementChild;
      expect(root?.className).toEqual(expect.stringContaining("h-full"));
    });
  });

  describe("Scroll behavior", () => {
    it("applies overflow-y-auto to the content area for vertical scrolling", () => {
      render(
        <SidePanel>
          <div>Scrollable content</div>
        </SidePanel>
      );
      // The content wrapper should have overflow-y-auto
      const content = screen.getByText("Scrollable content").parentElement;
      expect(content?.className).toEqual(expect.stringContaining("overflow-y-auto"));
    });

    it("keeps the title sticky when content scrolls (if title is present)", () => {
      render(<SidePanel title="Sticky Title">Content</SidePanel>);
      const heading = screen.getByRole("heading", { name: "Sticky Title" });
      const titleContainer = heading.parentElement;
      expect(titleContainer?.className).toEqual(expect.stringContaining("sticky"));
    });
  });

  describe("Tailwind styling", () => {
    it("uses a transparent background so it blends into the page as chrome, not a floating surface", () => {
      const { container } = render(<SidePanel>Content</SidePanel>);
      const root = container.firstElementChild;
      expect(root?.className).toEqual(expect.stringContaining("bg-transparent"));
      expect(root?.className).not.toEqual(expect.stringContaining("bg-background"));
      expect(root?.className).toEqual(expect.stringContaining("text-foreground"));
    });

    it("applies border styling using semantic border token", () => {
      const { container } = render(<SidePanel>Content</SidePanel>);
      const root = container.firstElementChild;
      expect(root?.className).toEqual(expect.stringContaining("border-border"));
    });
  });

  describe("Accessibility", () => {
    it("uses semantic HTML for the title", () => {
      render(<SidePanel title="Accessible Title">Content</SidePanel>);
      const heading = screen.getByRole("heading");
      expect(heading.tagName).toBe("H3");
    });

    it("preserves standard HTML attributes passed via spread", () => {
      const { container } = render(
        <SidePanel data-testid="custom-panel" aria-label="Side navigation">
          Content
        </SidePanel>
      );
      const root = container.firstElementChild;
      expect(root).toHaveAttribute("data-testid", "custom-panel");
      expect(root).toHaveAttribute("aria-label", "Side navigation");
    });
  });
});
