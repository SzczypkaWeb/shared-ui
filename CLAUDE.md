## UI Library
- Tailwind CSS v4 + Radix UI primitives (shadcn/ui pattern) - components are copied in as owned source code, not installed as a dependency.
- Simple text inputs (TextField, PasswordField) are native <input> elements styled with Tailwind, wired via plain react-hook-form register() (Controller is only needed for complex Radix components like Select/Dropdown).
- Validation is always done via Zod, regardless of the underlying component.
- Design tokens live in `src/styles/globals.css`, published as `@szczypkaweb/shared-ui/globals.css`. Consumer apps (frontend-shell, react-app, next-app) `@import` it directly instead of redefining the CSS variables themselves, and must point Tailwind's `@source`/content detection at the compiled `@szczypkaweb/shared-ui/dist` output - otherwise classes used inside shared-ui won't be generated in the consumer's CSS.

### Styling Conventions

**Form/input-style components** (inputs, textareas, selects—anything the user types/selects from):
- Use `bg-transparent` so they blend into whatever surface/container they're placed on.
- Their visual boundary should read from a clearly visible border alone, not from background color contrast.
- Applies to: `TextField`, `PasswordField`, `Input`, `TextArea`, `Select`.

**Floating surfaces** (components that render on top of arbitrary page content and must visually separate themselves from whatever is behind them):
- Use an opaque surface token (e.g., `bg-background`) since their job is to visually separate content.
- **Always manually verify contrast** under the actual `.dark` class using a Storybook story or test harness—do not assume a semantic token name is correct without visual testing.
- Applies to: `Card`, `Modal`'s content card, and any portaled popover/dropdown/content panel (e.g. `Select`'s `SelectPrimitive.Content`).

**Page chrome** (components that are meant to read as part of the page's own background, not as a card floating above it):
- Use `bg-transparent` so the component blends into whatever page/background it's dropped into, rather than reading as a separate surface.
- Applies to: `SidePanel`.
- Note: this is *not* the same bucket as Card/Modal above, even though both were previously lumped together as "container/surface components." A future dark-mode/contrast pass should not flip `SidePanel` back to an opaque `bg-background` by re-applying the floating-surface rule to it - `SidePanel` isn't a floating card, it's page chrome.

**Trigger vs. popover-content for compound/Radix components** (Select, and any future Combobox, Tooltip, Dropdown Menu, ...):
- These components have two visually distinct parts that follow *different* rules:
  - The trigger/input part (the always-visible control, e.g. `SelectPrimitive.Trigger`) follows the **form/input-style convention** above: `bg-transparent`, so it blends into its parent surface.
  - Any portaled popover/dropdown/content panel it opens (e.g. `SelectPrimitive.Content`) - which is rendered via a Portal and floats on top of arbitrary page content once open - always follows the **floating surfaces convention** above: opaque `bg-background`, regardless of which component "family" it belongs to. If it's transparent, whatever page content is underneath bleeds through the open popover and becomes unreadable.
- When adding a new Radix-based compound component with this trigger+content shape, classify each part independently by what it *is* (always-visible inline control vs. portaled floating panel) rather than by which component it belongs to.