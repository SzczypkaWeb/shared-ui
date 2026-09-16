import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";
import { StatusBadge, type StatusBadgeStatus } from "../StatusBadge";

export interface StatusRowProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Text (or other content) describing what the status applies to. */
  label: ReactNode;
  /** Which status to display next to the label. Passed straight through to `StatusBadge`. */
  status: StatusBadgeStatus;
}

/**
 * Pairs a label with a `StatusBadge` in a flex row - label on the left,
 * badge on the right.
 *
 * A small, fully generic layout primitive for the "label + status" pattern
 * (e.g. a step name next to its run status, a PR next to its review state)
 * that consuming apps previously had to hand-roll with an ad-hoc flexbox
 * `div` around `StatusBadge`. Nothing here is domain-specific - just a
 * `label` and a `status`.
 *
 * Composes `StatusBadge` for the status pill and uses the shared semantic
 * `text-foreground` token for the label, so it inherits dark mode support
 * from both without needing any theme-related props/logic of its own (same
 * theming contract as the rest of the library).
 */
export function StatusRow({ label, status, className, ...rest }: StatusRowProps) {
  return (
    <div className={cn("flex items-center justify-between gap-3", className)} {...rest}>
      <span className="text-sm font-medium text-foreground">{label}</span>
      <StatusBadge status={status} />
    </div>
  );
}
