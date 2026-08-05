# @szczypkaweb/shared-ui

Shared React + TypeScript UI component library, published to GitHub Packages.

## Components

- **Button** — a basic button with `variant` (`primary` | `secondary` | `ghost`) and `size` (`small` | `medium` | `large`) props.
- **Input** — a basic text input with an optional `label` and `error` message.
- **Card** — a basic container with optional `title` and `footer`.
- **TextField** — a Tailwind-styled, ref-forwarding native `<input>` built for react-hook-form's `register()` (no `Controller` needed). Renders a `FormError` when passed an `error` message.
- **PasswordField** — a `TextField` locked to `type="password"`. Takes an explicit `autoComplete` prop (e.g. `"current-password"` vs `"new-password"`) rather than hardcoding one.
- **FormError** — a small, muted-red message for a single field error. Renders nothing when no message is passed.
- **SubmitButton** — a Tailwind-styled submit button with an `isLoading` prop that disables it and shows a spinner.

None of the components read from `window`/`document` at module scope, so the package is safe to import from server-rendering consumers (e.g. Next.js).

### Styling

`TextField`, `PasswordField`, `FormError` and `SubmitButton` follow the shadcn/ui pattern: Tailwind utility classes (merged via the `cn` helper in `src/lib/utils.ts`, built on `clsx` + `tailwind-merge`) referencing a small set of CSS custom properties (`--background`, `--foreground`, `--border`, `--primary`, `--destructive`, etc.), defined for local development/Storybook in `src/styles/globals.css`.

This package does not ship compiled CSS. Consumer apps own their Tailwind pipeline and must:

1. Include this package's compiled output in their `tailwind.config.js` `content` globs, and
2. Define the same CSS custom properties (or their own values for them) in a global stylesheet.

`radix-ui` is included as a dependency for building future, more complex form controls (e.g. Select, Dropdown) that need it — the current form field components are plain native elements and don't depend on it directly.

## Development

```bash
npm install

# Run the test suite
npm test

# Type-check
npm run typecheck

# Lint
npm run lint

# Build the ESM + CJS bundle (dist/)
npm run build

# Run Storybook locally
npm run storybook

# Build the static Storybook site
npm run build-storybook
```

## Versioning & publishing

This package uses [Changesets](https://github.com/changesets/changesets) for versioning.

```bash
# After making a change that should be released, describe it:
npm run changeset

# Bump versions and update changelogs based on pending changesets:
npm run changeset:version

# Publish to GitHub Packages (requires authentication, see below):
npm run changeset:publish
```

Publishing targets GitHub Packages under the `@szczypkaweb` scope (see `.npmrc` and `publishConfig` in `package.json`). Authentication requires a `GITHUB_TOKEN` environment variable with `write:packages` permission.

This repository is set up for local development only for now — publishing is intentionally not part of this initial bootstrap.
