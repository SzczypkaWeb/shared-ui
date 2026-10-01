# shared-ui

## Stack
React + TypeScript component library, published as `@szczypkaweb/shared-ui`.
Tailwind CSS v4 + Radix UI primitives (shadcn/ui pattern) — components are
copied in as owned source code, not installed as a dependency.

## Run / test
- `pnpm install` then `pnpm storybook` (component playground).
- `pnpm test` — Vitest.
- `pnpm lint` — ESLint, zero warnings allowed.
- `pnpm typecheck` — `tsc --noEmit`.
- `pnpm build` — `tsup`, produces the published `dist/` output.
- `pnpm changeset` — required alongside any consumer-visible change, before
  `changeset:version`/`changeset:publish`.

## Structure
- `src/components/<Name>/` — one folder per component (component, stories,
  tests colocated).
- `src/lib/` — shared non-component utilities (e.g. `cn`/class merging).
- `src/styles/globals.css` — design tokens, published as
  `@szczypkaweb/shared-ui/globals.css`.
- `src/test/` — test setup/utilities.

## Conventions
- Simple text inputs (TextField, PasswordField) are native `<input>`
  elements styled with Tailwind, wired via plain react-hook-form
  `register()` (`Controller` only needed for complex Radix components like
  Select/Dropdown).
- Validation is always done via Zod, regardless of the underlying component.
- Consumer apps (`frontend-shell`, `react-app`, `next-app`) `@import`
  `globals.css` directly instead of redefining the CSS variables themselves,
  and must point Tailwind's `@source`/content detection at the compiled
  `dist` output — otherwise classes used inside shared-ui won't be generated
  in the consumer's CSS.

### Styling conventions

**Form/input-style components** (inputs, textareas, selects — anything the
user types/selects from): use `bg-transparent` so they blend into whatever
surface/container they're placed on; their visual boundary should read from
a clearly visible border alone, not background contrast. Applies to
`TextField`, `PasswordField`, `Input`, `TextArea`, `Select`.

**Floating surfaces** (components that render on top of arbitrary page
content and must visually separate themselves from it): use an opaque
surface token (e.g. `bg-background`). **Always manually verify contrast**
under the actual `.dark` class using a Storybook story or test harness — do
not assume a semantic token name is correct without visual testing. Applies
to `Card`, `Modal`'s content card, and any portaled popover/dropdown/content
panel (e.g. `Select`'s `SelectPrimitive.Content`).

**Page chrome** (components meant to read as part of the page's own
background, not a card floating above it): use `bg-transparent`. Applies to
`SidePanel`. Not the same bucket as Card/Modal above — a future dark-mode
pass should not flip `SidePanel` back to opaque by re-applying the
floating-surface rule to it.

**Trigger vs. popover-content** (Select, and any future Combobox, Tooltip,
Dropdown Menu, ...): the trigger/input part follows the form/input-style
convention (`bg-transparent`); any portaled popover/content panel it opens
always follows the floating-surfaces convention (opaque `bg-background`),
regardless of which component family it belongs to — otherwise page content
underneath bleeds through and becomes unreadable. Classify each part of a
new Radix-based compound component by what it *is* (inline control vs.
portaled floating panel), not by which component it belongs to.

## Never do
- Never add a component as an installed dependency — this library's whole
  model is owned, copied-in source (shadcn/ui pattern).
- Never ship a visual change without checking it in both light and `.dark`
  Storybook modes.
- Never bump the published version without a changeset.
- Never merge with a red `pnpm lint`/`pnpm typecheck`/`pnpm test`.
