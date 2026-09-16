import type { ReactNode } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { cn } from "../../lib/utils";

export interface ModalProps {
  /** Whether the modal is currently open. */
  open: boolean;
  /** Called when the modal requests to be opened/closed (close button, overlay click, Escape key, ...). */
  onOpenChange: (open: boolean) => void;
  /**
   * Optional title rendered via `Dialog.Title` for accessibility (wires up
   * `aria-labelledby` on the dialog automatically) and shown visually at the
   * top of the card.
   */
  title?: string;
  /** The modal body content. */
  children: ReactNode;
  /** Additional classes for the content card. */
  className?: string;
  /**
   * Controls the content card's width/layout.
   *
   * - `"md"` (default): today's centered card, `max-w-md`.
   * - `"lg"`: a wider centered card (`max-w-3xl`) for content-heavy dialogs.
   * - `"full"`: near-fullscreen, anchored with a small margin on every side
   *   via `inset` instead of a centered floating card.
   */
  size?: "md" | "lg" | "full";
}

const contentSharedClasses =
  "w-full rounded-lg border border-border bg-background text-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

const contentSizeClasses: Record<NonNullable<ModalProps["size"]>, string> = {
  // Centered card via `fixed` + `left-1/2 top-1/2` + translate. `fixed`
  // already establishes a containing block for `position: absolute`
  // descendants (the close button), so no `relative` is needed here - it
  // must never be combined with `fixed` since both set the CSS `position`
  // property on the same element, and which one wins would then depend on
  // Tailwind's generated rule order rather than class order.
  md: "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md max-h-[85vh] overflow-y-auto",
  lg: "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-3xl max-h-[85vh] overflow-y-auto",
  // `inset` anchors all four edges directly, so no translate/centering math
  // (or separate `max-h`, since `inset` already bounds the height) is needed.
  full: "fixed inset-4 sm:inset-8 max-w-none overflow-y-auto",
};

/**
 * A generic modal dialog built on Radix UI's `Dialog` primitive, styled with
 * Tailwind utility classes. Keeps the same overall shape/simplicity as
 * `SidePanel` - a single component, not a multi-part composable API.
 *
 * `Dialog.Root` is fully controlled via `open`/`onOpenChange`. ESC-to-close
 * and click-outside-to-close come for free from Radix's dismissable layer.
 *
 * Unlike form/input-style components (which use `bg-transparent`), the
 * content card uses the opaque `bg-background` surface token, since it's a
 * container/surface component that needs to visually separate itself from
 * the page content behind the overlay.
 */
export function Modal({
  open,
  onOpenChange,
  title,
  children,
  className,
  size = "md",
}: ModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          data-testid="modal-overlay"
          className={cn(
            "fixed inset-0 bg-black/50",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />
        <DialogPrimitive.Content
          // Not using cn()/twMerge here: size-based classes (e.g. `max-w-md`
          // vs `max-w-3xl`, or `fixed left-1/2 ...` vs `inset-4 ...`) fall
          // into tailwind-merge's conflict groups, so merging them through
          // twMerge against an arbitrary consumer `className` could silently
          // drop the one the consumer intended to add on top (e.g. a
          // consumer-supplied `max-w-*` override). Plain concatenation
          // preserves both; the consumer's `className` is appended
          // additively rather than conflict-resolved.
          className={[contentSharedClasses, contentSizeClasses[size], className]
            .filter(Boolean)
            .join(" ")}
        >
          {title ? (
            <DialogPrimitive.Title className="px-6 pt-6 pb-4 text-lg font-semibold leading-none tracking-tight">
              {title}
            </DialogPrimitive.Title>
          ) : null}
          <div className={cn(title ? "px-6 pb-6" : "p-6")}>{children}</div>
          <DialogPrimitive.Close asChild>
            <button
              type="button"
              aria-label="Close"
              className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-transparent text-foreground hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
