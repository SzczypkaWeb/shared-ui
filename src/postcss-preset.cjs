/**
 * Shared Tailwind v4 postcss config for the three consumer apps
 * (frontend-shell, react-app, next-app), published so none of them has to
 * hand-copy this same plugin config - exactly the kind of drift
 * globals.css (see ./styles/globals.css) already exists to prevent for the
 * design tokens.
 *
 * A plain .cjs file (not .js) so it stays require()-able from CommonJS
 * consumers regardless of this package's own "type": "module" in
 * package.json - Node always treats .cjs as CommonJS no matter what.
 */
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
