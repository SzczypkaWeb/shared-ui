---
"@szczypkaweb/shared-ui": patch
---

Fix two background-transparency regressions introduced by the earlier dark-mode contrast pass:

- **`SidePanel`**: the root now uses `bg-transparent` instead of the opaque `bg-background`. `SidePanel` is page chrome meant to blend into whatever page it's dropped into, not a floating card that needs to separate itself from content behind it (that's `Card`/`Modal`'s job) - it had incorrectly been swept into the same opaque-surface bucket as those during the contrast audit.
- **`Select`**: `SelectPrimitive.Content` (the portaled dropdown panel) now uses `bg-background` instead of `bg-transparent`. The trigger correctly stays `bg-transparent` so it blends into its parent surface, but the open dropdown floats on top of arbitrary page content and was letting whatever was behind it bleed through, making the option list hard to read.

No breaking changes - both are visual-only fixes to existing components.
