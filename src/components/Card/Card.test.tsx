import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("renders its children", () => {
    render(
      <Card>
        <p>Body content</p>
      </Card>
    );
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("renders an optional title as a heading", () => {
    render(<Card title="Card title">Body</Card>);
    expect(screen.getByRole("heading", { name: "Card title" })).toBeInTheDocument();
  });

  it("does not render a heading when no title is given", () => {
    render(<Card>Body</Card>);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders an optional footer", () => {
    render(<Card footer={<span>Footer text</span>}>Body</Card>);
    expect(screen.getByText("Footer text")).toBeInTheDocument();
  });

  it("forwards a custom className alongside its own classes", () => {
    const { container } = render(<Card className="extra">Body</Card>);
    expect(container.firstElementChild?.className).toContain("extra");
  });

  describe("Tailwind styling", () => {
    it("applies Tailwind container classes to the root instead of a semantic 'suib-card' class", () => {
      const { container } = render(<Card>Body</Card>);
      const root = container.firstElementChild;
      expect(root?.className).toEqual(expect.stringContaining("rounded-lg"));
      expect(root?.className).toEqual(expect.stringContaining("border-border"));
      expect(root?.className).toEqual(expect.stringContaining("bg-background"));
    });

    it("applies Tailwind heading classes to the title", () => {
      render(<Card title="Card title">Body</Card>);
      const heading = screen.getByRole("heading", { name: "Card title" });
      expect(heading.className).toEqual(expect.stringContaining("font-semibold"));
    });

    it("separates the footer from the body with a top border", () => {
      render(<Card footer={<span>Footer text</span>}>Body</Card>);
      const footer = screen.getByText("Footer text").parentElement;
      expect(footer?.className).toEqual(expect.stringContaining("border-t"));
    });

    it("no longer applies the legacy suib-card BEM classes", () => {
      const { container } = render(
        <Card title="T" footer="F">
          Body
        </Card>
      );
      expect(container.innerHTML).not.toMatch(/suib-/);
    });
  });

  describe("padding prop", () => {
    it("applies default padding (px-6 py-6) when no title or footer, and no padding prop", () => {
      const { container } = render(<Card>Body content</Card>);
      // Get the second child of the root (first is no title, second is content)
      const contentDiv = container.firstElementChild?.children[0] as HTMLElement;
      expect(contentDiv?.className).toContain("px-6");
      expect(contentDiv?.className).toContain("py-6");
    });

    it("applies default padding (px-6 pb-6) when title is present and no padding prop", () => {
      const { container } = render(<Card title="Title">Body content</Card>);
      // Get the content div (second child after title)
      const contentDiv = container.firstElementChild?.children[1] as HTMLElement;
      expect(contentDiv?.className).toContain("px-6");
      expect(contentDiv?.className).toContain("pb-6");
      expect(contentDiv?.className).not.toContain("py-6");
    });

    it("applies compact padding (p-4) when padding='compact' is set, without title", () => {
      const { container } = render(<Card padding="compact">Body content</Card>);
      const contentDiv = container.firstElementChild?.children[0] as HTMLElement;
      expect(contentDiv?.className).toContain("p-4");
      expect(contentDiv?.className).not.toContain("px-6");
      expect(contentDiv?.className).not.toContain("py-6");
    });

    it("applies compact padding (p-4) when padding='compact' is set, with title", () => {
      const { container } = render(
        <Card title="Title" padding="compact">
          Body content
        </Card>
      );
      const contentDiv = container.firstElementChild?.children[1] as HTMLElement;
      expect(contentDiv?.className).toContain("p-4");
      expect(contentDiv?.className).not.toContain("px-6");
      expect(contentDiv?.className).not.toContain("pb-6");
    });

    it("defaults to 'default' padding when padding prop is undefined", () => {
      const { container } = render(<Card padding="default">Body content</Card>);
      const contentDiv = container.firstElementChild?.children[0] as HTMLElement;
      expect(contentDiv?.className).toContain("px-6");
      expect(contentDiv?.className).toContain("py-6");
    });
  });
});
