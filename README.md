# @szczypkaweb/shared-ui

Shared React + TypeScript UI component library, published to GitHub Packages.

## Components

- **Button** — a basic button with `variant` (`primary` | `secondary` | `ghost`) and `size` (`small` | `medium` | `large`) props.
- **Input** — a basic text input with an optional `label` and `error` message.
- **Card** — a basic container with optional `title` and `footer`.

None of the components read from `window`/`document` at module scope, so the package is safe to import from server-rendering consumers (e.g. Next.js).

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
