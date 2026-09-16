import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Content rendered inside the link. */
  children: ReactNode;
  /** Whether the link points to an external URL. When true, automatically sets target="_blank" and rel="noreferrer noopener", and renders an external link icon. Defaults to false. */
  external?: boolean;
}

/**
 * A small external link icon SVG, rendered inline after the link text
 * when the link points to an external URL.
 *
 * No dependency on icon libraries - just a plain SVG string.
 */
function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline ml-1"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/**
 * Base Tailwind classes applied to all links.
 * This is a literal string that will be picked up by Tailwind's content scanner.
 *
 * Uses semantic design tokens (text-primary) that automatically repaint
 * when an ancestor toggles the `.dark` class.
 */
const baseClasses = "text-primary hover:underline";

/**
 * A styled anchor element for both internal and external links.
 *
 * For external links (external=true), automatically sets target="_blank"
 * and rel="noreferrer noopener" for security, and renders a small
 * external-link arrow icon inline after the children.
 *
 * Does not depend on any external UI framework and does not touch
 * `window`/`document` at module scope, so it is safe to import in
 * server-rendering environments.
 *
 * Uses Tailwind utility classes for styling. The classes are literal strings
 * so they will be picked up by Tailwind's content scanner in consuming applications.
 */
export function Link({
  children,
  external = false,
  className,
  href,
  target,
  rel,
  ...rest
}: LinkProps) {
  const externalAttrs = external
    ? {
        target: target || "_blank",
        rel: rel || "noreferrer noopener",
      }
    : {
        target: target,
        rel: rel,
      };

  return (
    <a href={href} className={cn(baseClasses, className)} {...externalAttrs} {...rest}>
      {children}
      {external && <ExternalLinkIcon />}
    </a>
  );
}
