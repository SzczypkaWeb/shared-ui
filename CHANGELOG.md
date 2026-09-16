# @szczypkaweb/shared-ui

## 0.8.0

### Minor Changes

- f453223: Add `padding` prop to `Card` component and fix form input/dark mode contrast issues.
  
  - `Card`: adds optional `padding?: "default" | "compact"` prop to control content area padding. "default" (the existing behavior) uses `px-6 py-6`/`px-6 pb-6` for spacious layouts; "compact" uses `p-4` for dense contexts like scrollable item lists.
  - `Input` and `TextField`: switched background from `bg-background` to `bg-transparent` to follow the form input convention—they now blend into their container's surface with only the border serving as a visible boundary (matching the pattern already applied to `TextArea` and `Select`).
  - `CLAUDE.md`: added a styling convention section clarifying that form/input-style components should use `bg-transparent` and container/surface components should use opaque tokens with manually verified dark mode contrast.
  
  No breaking changes—`Card`'s `padding` prop is optional and defaults to the existing behavior; Input/TextField visual changes improve contrast and follow the established form component pattern.

## 0.7.0

### Minor Changes

- 74f8b2d: Polish `TextArea` and `Select`: auto-growing textarea, dropdown width tracking, rounded-lg corners, higher-contrast borders, and transparent backgrounds.
  
  - `TextArea`: auto-grows vertically as the user types (via `scrollHeight` measurement on input/mount/value changes) instead of staying a fixed `min-h-[80px]` box with the browser's native resize handle (now disabled via `resize-none`). Adds a new `maxHeight?: number` prop (default `320`, in pixels) - once content exceeds it, the textarea stops growing and falls back to internal scrolling.
  - `Select`: the open dropdown (`SelectPrimitive.Content`) now tracks the trigger's exact width via Radix's `--radix-select-trigger-width` CSS variable (`w-[var(--radix-select-trigger-width)]`), instead of sizing independently off `min-w-[8rem]` alone (kept as a fallback floor for narrow triggers).
  - Both components: bumped corner rounding from `rounded-md` to `rounded-lg`, and switched their background from `bg-background` to `bg-transparent` so they blend into whatever surface they're placed on instead of always showing the app's base background color.
  - `globals.css`: increased the `--border`/`--input` token contrast in both the light and dark theme (the previous shadcn/ui defaults were only ~1.2-1.4:1 against `--background`, barely visible) so `border-input`/`border-border` now read as a clearly visible boundary now that these fields no longer rely on an opaque background to be legible.
  
  No breaking changes - `maxHeight` is optional and defaults to the previous effective ceiling-free behavior capped at a sensible value; all other changes are visual refinements using the existing semantic design tokens.

## 0.6.0

### Minor Changes

- de09d55: Add `StatusRow` component.
  
  Pairs a `label` with a `StatusBadge` in a flex row (label on the left, status pill on the right) - a small, fully generic layout primitive for the common "label + status" pattern (e.g. a step name next to its run status) that consuming apps previously had to hand-roll with an ad-hoc flexbox `div` around `StatusBadge`. Composes `StatusBadge` and the shared `text-foreground` token for its own text, so it inherits dark mode support without any theme-related props/logic of its own.

## 0.5.0

### Minor Changes

- b7f58e7: Add class-based dark mode support (`.dark` on an ancestor element) across all components.
  
  - `globals.css`: added a `.dark { ... }` override block with dark values for every existing token (`--background`, `--foreground`, `--border`, `--input`, `--ring`, `--primary`, `--primary-foreground`, `--muted`, `--muted-foreground`, `--destructive`, `--destructive-foreground`), following the standard shadcn/ui dark palette. Also introduced two new token pairs - `--secondary`/`--secondary-foreground` and `--accent`/`--accent-foreground` - both mapped into `@theme inline` and overridden in `.dark`, needed by `Button`'s `secondary`/`ghost` variants below.
  - `Button`: replaced hardcoded Tailwind palette classes (`bg-blue-600`, `bg-gray-200`, `text-gray-700`, ...) with the semantic design tokens (`bg-primary`, `bg-secondary`, `hover:bg-accent`, ...), so all three variants now repaint automatically when `.dark` toggles.
  - `StatusBadge`: kept its bespoke per-status palette (there's no single shared token per status) but added explicit `dark:` Tailwind variants for every status so each pill still has adequate contrast in dark mode.
  
  No other components changed - `Card`, `FormError`, `Input`, `PasswordField`, `Select`, `SubmitButton`, `TextArea`, and `TextField` already consumed the semantic tokens exclusively and needed no changes. No component gained any new theme-related prop: consuming apps toggle a single `.dark` class on a root element and every component repaints via CSS alone.

## 0.4.0

### Minor Changes

- 4113a45: Add `Select`, `TextArea`, and `StatusBadge` components.

  - `Select`: a dropdown built on Radix UI's `Select` primitive (via the existing `radix-ui` dependency), styled to match `TextField`/`PasswordField`. Since Radix's `Select` is not a native `<select>`, it exposes a `value`/`onChange`-shaped API (plus a Radix-idiomatic `onValueChange` alias) instead of supporting `register()`, so it should be wired up via react-hook-form's `Controller`. Accepts `options`, `placeholder`, and an `error` message rendered the same way as other form fields.
  - `TextArea`: a ref-forwarding native `<textarea>` styled like `TextField`, working directly with react-hook-form's `register()` (no `Controller` needed) and sharing the same `error` prop/rendering.
  - `StatusBadge`: a colored pill for the `running | done | blocked | failed | approved | changes_requested` status enum, with one distinct color variant per status.

  This also adds `zod` and `@hookform/resolvers` as devDependencies, used to demonstrate Zod-based Controller validation in the new `Select` Storybook stories.

## 0.3.0

### Minor Changes

- Convert Card and Input to Tailwind utility classes (drop legacy `suib-*` classes, which were left unstyled after the Tailwind v4 migration). Add a shared postcss preset, published as `@szczypkaweb/shared-ui/postcss.config`, so consuming apps don't duplicate the postcss config.

## 0.2.0

### Minor Changes

- Migrate to Tailwind CSS v4 and publish the design tokens as a real shared stylesheet.

  - `src/styles/globals.css` is now part of the published package (`@szczypkaweb/shared-ui/globals.css`) instead of being Storybook-only. Consumer apps should `@import "@szczypkaweb/shared-ui/globals.css";` in their own global stylesheet instead of hand-copying the CSS variables.
  - **Breaking for consumers**: requires Tailwind CSS v4 (`@theme`/`@custom-variant` syntax). Apps still on Tailwind v3 must migrate before picking up this version.
  - `tailwind.config.cjs` removed — v4 is CSS-first, no JS config needed for these tokens anymore.

## 0.1.0

### Minor Changes

- d783488: Add `TextField`, `PasswordField`, `FormError`, and `SubmitButton` form field components, built with Tailwind CSS and following the shadcn/ui pattern.

  - `TextField` and `PasswordField` are ref-forwarding native `<input>` elements that work directly with react-hook-form's `register()` (no `Controller` needed), and render a `FormError` below them when passed an `error` message.
  - `PasswordField` accepts an explicit `autoComplete` prop instead of hardcoding one, so callers can differentiate `"current-password"` (login) from `"new-password"` (registration).
  - `FormError` renders nothing when no message is passed.
  - `SubmitButton` adds an `isLoading` prop that disables the button and shows a loading spinner.

  This also introduces Tailwind CSS + Radix UI as dependencies, a base `tailwind.config.cjs`/`postcss.config.cjs`, and a shared `cn` class-name helper (`clsx` + `tailwind-merge`) for use by future components.
