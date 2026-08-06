# @szczypkaweb/shared-ui

## 0.1.0

### Minor Changes

- d783488: Add `TextField`, `PasswordField`, `FormError`, and `SubmitButton` form field components, built with Tailwind CSS and following the shadcn/ui pattern.

  - `TextField` and `PasswordField` are ref-forwarding native `<input>` elements that work directly with react-hook-form's `register()` (no `Controller` needed), and render a `FormError` below them when passed an `error` message.
  - `PasswordField` accepts an explicit `autoComplete` prop instead of hardcoding one, so callers can differentiate `"current-password"` (login) from `"new-password"` (registration).
  - `FormError` renders nothing when no message is passed.
  - `SubmitButton` adds an `isLoading` prop that disables the button and shows a loading spinner.

  This also introduces Tailwind CSS + Radix UI as dependencies, a base `tailwind.config.cjs`/`postcss.config.cjs`, and a shared `cn` class-name helper (`clsx` + `tailwind-merge`) for use by future components.
