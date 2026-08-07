# @szczypkaweb/shared-ui

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
