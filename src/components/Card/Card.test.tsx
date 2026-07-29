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
});
