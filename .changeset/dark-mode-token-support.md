---
"@szczypkaweb/shared-ui": minor
---

Add class-based dark mode support (`.dark` on an ancestor element) across all components.

- `globals.css`: added a `.dark { ... }` override block with dark values for every existing token (`--background`, `--foreground`, `--border`, `--input`, `--ring`, `--primary`, `--primary-foreground`, `--muted`, `--muted-foreground`, `--destructive`, `--destructive-foreground`), following the standard shadcn/ui dark palette. Also introduced two new token pairs - `--secondary`/`--secondary-foreground` and `--accent`/`--accent-foreground` - both mapped into `@theme inline` and overridden in `.dark`, needed by `Button`'s `secondary`/`ghost` variants below.
- `Button`: replaced hardcoded Tailwind palette classes (`bg-blue-600`, `bg-gray-200`, `text-gray-700`, ...) with the semantic design tokens (`bg-primary`, `bg-secondary`, `hover:bg-accent`, ...), so all three variants now repaint automatically when `.dark` toggles.
- `StatusBadge`: kept its bespoke per-status palette (there's no single shared token per status) but added explicit `dark:` Tailwind variants for every status so each pill still has adequate contrast in dark mode.

No other components changed - `Card`, `FormError`, `Input`, `PasswordField`, `Select`, `SubmitButton`, `TextArea`, and `TextField` already consumed the semantic tokens exclusively and needed no changes. No component gained any new theme-related prop: consuming apps toggle a single `.dark` class on a root element and every component repaints via CSS alone.
