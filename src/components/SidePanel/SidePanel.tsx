import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

export interface SidePanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional title rendered as a sticky heading above the scrollable content. */
  title?: string;
  /** The scrollable list content of the panel. */
  children?: ReactNode;
}

/**
 * A narrow, vertically scrollable side panel component.
 *
 * Fixed width of 288px (Tailwind w-72), full height of its parent (h-full),
 * with overflow-y-auto on the content area only. The optional title remains
 * sticky at the top while content scrolls beneath it.
 *
 * Does not implement any virtualization, pagination, or list-item rendering
 * logic—purely a layout shell for reuse in different layouts. Uses semantic
 * Tailwind design tokens (border-border, text-foreground) and is SSR-safe
 * (no window/document access at module scope).
 *
 * Unlike floating surfaces such as `Card` or `Modal`'s content card, the
 * panel is page chrome, not something that needs to separate itself from
 * arbitrary content behind it - it renders as part of the page's own
 * background, so the root uses `bg-transparent` rather than the opaque
 * `bg-background` surface token. The sticky title bar keeps `bg-background`
 * so scrolling content doesn't show through it as the list scrolls beneath.
 */
export function SidePanel({ title, children, className, ...rest }: SidePanelProps) {
  return (
    <div
      className={cn("w-72 h-full flex flex-col bg-transparent border-r border-border text-foreground", className)}
      {...rest}
    >
      {title ? (
        <div className="sticky top-0 bg-background border-b border-border">
          <h3 className="px-6 py-4 text-lg font-semibold leading-none tracking-tight">{title}</h3>
        </div>
      ) : null}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
