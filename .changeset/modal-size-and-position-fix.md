---
"@szczypkaweb/shared-ui": minor
---

Fix a `Modal` positioning bug and add a `size` prop for width/layout.

- **Fix**: `Modal`'s content card classes included both `fixed` and `relative` at once. These both set the CSS `position` property on the same element with no `cn()`/twMerge deduplication between them, so which one actually applied depended on Tailwind's generated stylesheet rule order, not on class order in the attribute - if `relative` won, the dialog lost its fixed positioning relative to the viewport and rendered at its normal-flow location (wherever the Radix portal div happens to sit in the DOM), then got shifted down by `top: 50%` of that unrelated containing block. `relative` has been removed - a `fixed`-positioned element already establishes a containing block for the `absolute`-positioned close button, so it was redundant even before being a bug.
- **New**: `size?: "md" | "lg" | "full"` (default `"md"`) controls the content card's width/layout.
  - `"md"` (default): unchanged - today's centered card, `max-w-md`.
  - `"lg"`: a wider centered card, `max-w-3xl`, for content-heavy dialogs (e.g. a run-details view with several sections of text/data). Same centering and `max-h-[85vh] overflow-y-auto` scrolling behavior as `"md"`.
  - `"full"`: near-fullscreen, anchored with a small margin on every side via `inset-4 sm:inset-8 max-w-none` instead of a centered floating card.

No breaking changes - `size` is optional and defaults to the existing `"md"` behavior (now without the positioning bug).
