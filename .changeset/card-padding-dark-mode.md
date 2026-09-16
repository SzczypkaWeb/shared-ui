---
"@szczypkaweb/shared-ui": minor
---

Add `padding` prop to `Card` component and fix form input/dark mode contrast issues.

- `Card`: adds optional `padding?: "default" | "compact"` prop to control content area padding. "default" (the existing behavior) uses `px-6 py-6`/`px-6 pb-6` for spacious layouts; "compact" uses `p-4` for dense contexts like scrollable item lists.
- `Input` and `TextField`: switched background from `bg-background` to `bg-transparent` to follow the form input convention—they now blend into their container's surface with only the border serving as a visible boundary (matching the pattern already applied to `TextArea` and `Select`).
- `CLAUDE.md`: added a styling convention section clarifying that form/input-style components should use `bg-transparent` and container/surface components should use opaque tokens with manually verified dark mode contrast.

No breaking changes—`Card`'s `padding` prop is optional and defaults to the existing behavior; Input/TextField visual changes improve contrast and follow the established form component pattern.
