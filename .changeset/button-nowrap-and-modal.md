---
"@szczypkaweb/shared-ui": minor
---

Fix `Button` text wrapping in constrained flex layouts and add a new `Modal` component.

- `Button`: added `whitespace-nowrap` and `shrink-0` to the base classes so the label never wraps onto two lines and the button is never compressed below its natural content width when placed next to other elements (e.g. a `Select`) inside a constrained `flex` container. Both remain overridable via the existing `className` prop - `Button` now merges its classes through `cn()` (`clsx` + `tailwind-merge`) instead of a plain string join, so a consumer's conflicting utility (e.g. `whitespace-normal`, `shrink`) properly wins.
- `Modal`: a new generic modal dialog built on the `radix-ui` package's `Dialog` primitive, mirroring `Select`'s composition pattern. Keeps the same single-component shape as `SidePanel` (not a multi-part composable API). API: `open`, `onOpenChange`, optional `title` (rendered via `Dialog.Title` for accessibility), `children`, and `className` for the content card. Renders a full-screen `bg-black/50` backdrop with fade in/out, a centered card (`rounded-lg`, `border border-border`, `shadow-lg`, `max-w-md`, `max-h-[85vh] overflow-y-auto` so long content scrolls inside the card), and an icon-only, iOS-style circular close button (`aria-label="Close"`) in the top-right corner. As a container/surface component (not a form control), the card uses the opaque `bg-background` token rather than `bg-transparent` - contrast against the backdrop and against card content was manually verified in both light and `.dark` mode via its Storybook story. ESC-to-close and overlay-click-to-close come for free from Radix.

No breaking changes - `Button`'s new base classes only add missing `whitespace-nowrap`/`shrink-0` behavior (still overridable), and `Modal` is a new, purely additive component.
