import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export type SpinnerSize = "small" | "medium" | "large";

export interface SpinnerProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Size of the spinner. Defaults to "medium". */
  size?: SpinnerSize;
  /** Accessible label text for screen readers. Defaults to "Loading..." */
  label?: string;
}

/**
 * Tailwind class strings for each size.
 * These are literal strings that will be picked up by Tailwind's content scanner.
 */
const sizeClasses: Record<SpinnerSize, string> = {
  small: "w-4 h-4 border-2",
  medium: "w-6 h-6 border-2",
  large: "w-8 h-8 border-2",
};

/**
 * Base Tailwind classes applied to all spinners.
 * This is a literal string that will be picked up by Tailwind's content scanner.
 *
 * Uses semantic design tokens:
 * - border-muted: the static "track" part of the spinner
 * - border-t-primary: the animated "edge" that rotates
 * - animate-spin: Tailwind's built-in CSS animation for rotation
 */
const baseClasses =
  "border border-muted border-t-primary rounded-full animate-spin";

/**
 * A small loading indicator with a spinning circular border.
 *
 * Renders a visually hidden screen-reader label (defaults to "Loading...")
 * via the `sr-only` class, making the spinner accessible to assistive
 * technologies without displaying visible text.
 *
 * Does not depend on any external UI framework and does not touch
 * `window`/`document` at module scope, so it is safe to import in
 * server-rendering environments.
 *
 * Uses Tailwind utility classes for styling. The classes are literal strings
 * so they will be picked up by Tailwind's content scanner in consuming applications.
 */
export function Spinner({ size = "medium", label = "Loading...", className, ...rest }: SpinnerProps) {
  return (
    <div role="status" aria-live="polite" className={className} {...rest}>
      <div className={cn(baseClasses, sizeClasses[size])} />
      <span className="sr-only">{label}</span>
    </div>
  );
}
