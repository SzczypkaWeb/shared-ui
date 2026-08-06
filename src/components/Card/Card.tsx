import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional title rendered as a heading at the top of the card. */
  title?: string;
  /** Main content of the card. */
  children?: ReactNode;
  /** Optional content rendered in a footer area at the bottom of the card. */
  footer?: ReactNode;
}

/**
 * A basic, framework-agnostic container component with optional title and
 * footer.
 *
 * Uses Tailwind utility classes for styling (shadcn/ui conventions), driven
 * by the shared design tokens from this package's globals.css, rather than
 * the legacy 'suib-card' BEM classes this component used to render (those
 * relied on a hand-authored stylesheet that no longer exists post-Tailwind
 * migration, so they rendered unstyled).
 */
export function Card({ title, footer, children, className, ...rest }: CardProps) {
  return (
    <div
      className={cn("rounded-lg border border-border bg-background text-foreground shadow-sm", className)}
      {...rest}
    >
      {title ? (
        <h3 className="px-6 pt-6 pb-4 text-lg font-semibold leading-none tracking-tight">{title}</h3>
      ) : null}
      <div className={cn("px-6", title ? "pb-6" : "py-6")}>{children}</div>
      {footer ? <div className="border-t border-border px-6 py-4">{footer}</div> : null}
    </div>
  );
}
