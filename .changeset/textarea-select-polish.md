---
"@szczypkaweb/shared-ui": minor
---

Polish `TextArea` and `Select`: auto-growing textarea, dropdown width tracking, rounded-lg corners, higher-contrast borders, and transparent backgrounds.

- `TextArea`: auto-grows vertically as the user types (via `scrollHeight` measurement on input/mount/value changes) instead of staying a fixed `min-h-[80px]` box with the browser's native resize handle (now disabled via `resize-none`). Adds a new `maxHeight?: number` prop (default `320`, in pixels) - once content exceeds it, the textarea stops growing and falls back to internal scrolling.
- `Select`: the open dropdown (`SelectPrimitive.Content`) now tracks the trigger's exact width via Radix's `--radix-select-trigger-width` CSS variable (`w-[var(--radix-select-trigger-width)]`), instead of sizing independently off `min-w-[8rem]` alone (kept as a fallback floor for narrow triggers).
- Both components: bumped corner rounding from `rounded-md` to `rounded-lg`, and switched their background from `bg-background` to `bg-transparent` so they blend into whatever surface they're placed on instead of always showing the app's base background color.
- `globals.css`: increased the `--border`/`--input` token contrast in both the light and dark theme (the previous shadcn/ui defaults were only ~1.2-1.4:1 against `--background`, barely visible) so `border-input`/`border-border` now read as a clearly visible boundary now that these fields no longer rely on an opaque background to be legible.

No breaking changes - `maxHeight` is optional and defaults to the previous effective ceiling-free behavior capped at a sensible value; all other changes are visual refinements using the existing semantic design tokens.
