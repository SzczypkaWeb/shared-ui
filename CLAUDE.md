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

**Container/surface components** (Card, SidePanel, and similar—visual separators from content behind them):
- Use an opaque surface token (e.g., `bg-background`) since their job is to visually separate content.
- **Always manually verify contrast** under the actual `.dark` class using a Storybook story or test harness—do not assume a semantic token name is correct without visual testing.
- Applies to: `Card`, `SidePanel`.