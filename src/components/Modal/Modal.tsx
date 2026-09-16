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
}

const contentBaseClasses =
  "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-lg border border-border bg-background text-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

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
export function Modal({ open, onOpenChange, title, children, className }: ModalProps) {
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
          // Not using cn()/twMerge here: `fixed` and `relative` both fall
          // into tailwind-merge's "position" conflict group, so merging them
          // through twMerge would silently drop one. Both are intentional -
          // `fixed` centers the card on screen, `relative` (redundant for
          // CSS purposes, since a `fixed` element is already a containing
          // block, but kept per spec for clarity) lets the absolutely
          // positioned close button anchor to the card itself. Plain
          // concatenation preserves both; the consumer's `className` is
          // appended additively rather than conflict-resolved.
          className={[contentBaseClasses, className].filter(Boolean).join(" ")}
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
