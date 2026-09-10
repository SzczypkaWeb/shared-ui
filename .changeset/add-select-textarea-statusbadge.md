---
"@szczypkaweb/shared-ui": minor
---

Add `Select`, `TextArea`, and `StatusBadge` components.

- `Select`: a dropdown built on Radix UI's `Select` primitive (via the existing `radix-ui` dependency), styled to match `TextField`/`PasswordField`. Since Radix's `Select` is not a native `<select>`, it exposes a `value`/`onChange`-shaped API (plus a Radix-idiomatic `onValueChange` alias) instead of supporting `register()`, so it should be wired up via react-hook-form's `Controller`. Accepts `options`, `placeholder`, and an `error` message rendered the same way as other form fields.
- `TextArea`: a ref-forwarding native `<textarea>` styled like `TextField`, working directly with react-hook-form's `register()` (no `Controller` needed) and sharing the same `error` prop/rendering.
- `StatusBadge`: a colored pill for the `running | done | blocked | failed | approved | changes_requested` status enum, with one distinct color variant per status.

This also adds `zod` and `@hookform/resolvers` as devDependencies, used to demonstrate Zod-based Controller validation in the new `Select` Storybook stories.
