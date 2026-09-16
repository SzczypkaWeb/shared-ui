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

  describe("dark mode support", () => {
    // StatusBadge's per-status colors are a bespoke palette (one hue per
    // status) that doesn't map onto the shared semantic tokens, so - per the
    // theming contract - each status class string must carry its own
    // explicit `dark:` Tailwind variants rather than relying on a
    // `.dark`-scoped CSS custom property.
    it.each(Object.keys(expectedLabels) as StatusBadgeStatus[])(
      "includes a dark: background and text variant for status %s",
      (status) => {
        render(<StatusBadge status={status} />);
        const badge = screen.getByText(expectedLabels[status]);
        expect(badge.className).toMatch(/dark:bg-\S+/);
        expect(badge.className).toMatch(/dark:text-\S+/);
      }
    );
  });
});
