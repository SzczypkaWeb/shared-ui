import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusRow } from "./StatusRow";
import type { StatusBadgeStatus } from "../StatusBadge";

describe("StatusRow", () => {
  it("renders the given label", () => {
    render(<StatusRow label="Deploy" status="running" />);
    expect(screen.getByText("Deploy")).toBeInTheDocument();
  });

  it("renders the status badge's human-readable label", () => {
    render(<StatusRow label="Deploy" status="done" />);
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("renders the label before the status badge (label on the left, status on the right)", () => {
    const { container } = render(<StatusRow label="Deploy" status="running" />);
    const root = container.firstElementChild as HTMLElement;
    const children = Array.from(root.children);
    const labelIndex = children.findIndex((child) => child.textContent === "Deploy");
    const statusIndex = children.findIndex((child) => child.textContent === "Running");

    expect(labelIndex).toBeGreaterThanOrEqual(0);
    expect(statusIndex).toBeGreaterThan(labelIndex);
  });

  it("accepts any ReactNode as the label, not just plain strings", () => {
    render(
      <StatusRow
        label={
          <span>
            Step <strong>1</strong>
          </span>
        }
        status="blocked"
      />
    );
    expect(screen.getByText("Step")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("forwards a custom className alongside its own classes", () => {
    const { container } = render(<StatusRow label="Deploy" status="running" className="extra" />);
    expect(container.firstElementChild?.className).toContain("extra");
  });

  it("forwards other HTML attributes to the root element", () => {
    render(<StatusRow label="Deploy" status="running" data-testid="deploy-row" />);
    expect(screen.getByTestId("deploy-row")).toBeInTheDocument();
  });

  it.each([
    ["running", "Running"],
    ["done", "Done"],
    ["blocked", "Blocked"],
    ["failed", "Failed"],
    ["approved", "Approved"],
    ["changes_requested", "Changes requested"],
  ] as Array<[StatusBadgeStatus, string]>)("renders status %s with its badge label %s", (status, label) => {
    render(<StatusRow label="Deploy" status={status} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  describe("layout", () => {
    it("lays the label and status out with flexbox", () => {
      const { container } = render(<StatusRow label="Deploy" status="running" />);
      expect(container.firstElementChild).toHaveClass("flex");
    });
  });

  describe("dark mode support", () => {
    // StatusRow doesn't own any theme/color logic itself - it composes
    // `StatusBadge` (whose bespoke per-status palette already carries
    // explicit `dark:` variants) and otherwise relies on the shared
    // semantic tokens (e.g. `text-foreground`) that repaint automatically
    // when an ancestor toggles the `.dark` class. So there's nothing
    // status-row-specific to assert beyond: the rendered badge still
    // carries its own dark: variants when composed inside StatusRow.
    it("still carries the status badge's dark: variants when composed inside StatusRow", () => {
      render(<StatusRow label="Deploy" status="failed" />);
      const badge = screen.getByText("Failed");
      expect(badge.className).toMatch(/dark:bg-\S+/);
      expect(badge.className).toMatch(/dark:text-\S+/);
    });
  });
});
