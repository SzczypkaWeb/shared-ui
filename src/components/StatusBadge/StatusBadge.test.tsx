import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBadge, type StatusBadgeStatus } from "./StatusBadge";

const expectedLabels: Record<StatusBadgeStatus, string> = {
  running: "Running",
  done: "Done",
  blocked: "Blocked",
  failed: "Failed",
  approved: "Approved",
  changes_requested: "Changes requested",
};

describe("StatusBadge", () => {
  it.each(Object.entries(expectedLabels) as Array<[StatusBadgeStatus, string]>)(
    "renders the human-readable label for status %s",
    (status, label) => {
      render(<StatusBadge status={status} />);
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  );

  it("applies a distinct set of classes per status", () => {
    const statuses = Object.keys(expectedLabels) as StatusBadgeStatus[];
    const classNames = statuses.map((status) => {
      const { container } = render(<StatusBadge status={status} />);
      return container.firstElementChild?.className;
    });

    expect(new Set(classNames).size).toBe(statuses.length);
  });

  it("renders as a rounded pill", () => {
    render(<StatusBadge status="done" />);
    expect(screen.getByText("Done")).toHaveClass("rounded-full");
  });

  it("passes through a custom className alongside the variant classes", () => {
    render(<StatusBadge status="failed" className="custom-class" />);
    expect(screen.getByText("Failed")).toHaveClass("custom-class");
  });
});
