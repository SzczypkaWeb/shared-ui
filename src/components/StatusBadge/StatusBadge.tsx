import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export type StatusBadgeStatus = "running" | "done" | "blocked" | "failed" | "approved" | "changes_requested";

export interface StatusBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Which status this badge represents. Determines its label and color. */
  status: StatusBadgeStatus;
}

/**
 * Human-readable label shown for each status.
 */
const statusLabels: Record<StatusBadgeStatus, string> = {
  running: "Running",
  done: "Done",
  blocked: "Blocked",
  failed: "Failed",
  approved: "Approved",
  changes_requested: "Changes requested",
};

/**
 * Tailwind class strings for each status's color variant.
 * These are literal strings (same convention as `Button`'s `variantClasses`)
 * so they are picked up by Tailwind's content scanner in consuming apps.
 *
 * Each status needs its own distinct hue, so - unlike most other
 * components - this doesn't map cleanly onto the shared semantic tokens
 * (there's no single "success"/"danger" token per status). Instead, each
 * class string carries its own explicit `dark:` variant so the badge still
 * repaints correctly when an ancestor toggles the `.dark` class, without
 * needing any theme-related props/logic on the component itself.
 */
const statusClasses: Record<StatusBadgeStatus, string> = {
  running: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  done: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  blocked: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
  failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  approved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  changes_requested: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
};

/**
 * A small colored pill representing the status of a task/PR/run.
 *
 * Uses Tailwind utility classes for styling (same literal-class-string
 * convention as `Button`), with one visually distinct color variant per
 * status.
 */
export function StatusBadge({ status, className, ...rest }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        statusClasses[status],
        className
      )}
      {...rest}
    >
      {statusLabels[status]}
    </span>
  );
}
