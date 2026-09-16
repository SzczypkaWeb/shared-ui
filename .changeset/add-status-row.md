---
"@szczypkaweb/shared-ui": minor
---

Add `StatusRow` component.

Pairs a `label` with a `StatusBadge` in a flex row (label on the left, status pill on the right) - a small, fully generic layout primitive for the common "label + status" pattern (e.g. a step name next to its run status) that consuming apps previously had to hand-roll with an ad-hoc flexbox `div` around `StatusBadge`. Composes `StatusBadge` and the shared `text-foreground` token for its own text, so it inherits dark mode support without any theme-related props/logic of its own.
