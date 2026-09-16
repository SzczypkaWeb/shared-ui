import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Read the raw CSS source directly off disk - Vitest's `css: false` (see
// vitest.config.ts) replaces CSS module imports (including `?raw` ones)
// with an empty string, so the file has to be read as a plain text fixture
// instead. This is the actual published `./globals.css` subpath export.
const css = readFileSync(join(process.cwd(), "src/styles/globals.css"), "utf-8");

/**
 * Extracts the custom-property declarations (`--token: value;`) from the
 * first top-level block matching `selector { ... }` in the given CSS source.
 * Returns a map of token name -> value.
 */
function extractTokens(source: string, selector: string): Record<string, string> {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const blockMatch = new RegExp(`${escaped}\\s*\\{([^}]*)\\}`).exec(source);
  if (!blockMatch) {
    return {};
  }
  const tokens: Record<string, string> = {};
  const declPattern = /--([\w-]+)\s*:\s*([^;]+);/g;
  let declMatch: RegExpExecArray | null;
  while ((declMatch = declPattern.exec(blockMatch[1])) !== null) {
    tokens[declMatch[1]] = declMatch[2].trim();
  }
  return tokens;
}

describe("globals.css dark mode support", () => {
  it("declares the class-based dark custom variant (not just prefers-color-scheme)", () => {
    expect(css).toContain("@custom-variant dark (&:where(.dark, .dark *));");
  });

  it("defines a .dark override block", () => {
    expect(css).toMatch(/\.dark\s*\{/);
  });

  it("overrides every :root design token inside .dark", () => {
    const rootTokens = extractTokens(css, ":root");
    const darkTokens = extractTokens(css, ".dark");

    // Sanity check: the extraction actually found tokens in both blocks.
    expect(Object.keys(rootTokens).length).toBeGreaterThan(0);
    expect(Object.keys(darkTokens).length).toBeGreaterThan(0);

    const tokensThatMustDiffer = [
      "background",
      "foreground",
      "border",
      "input",
      "ring",
      "primary",
      "muted",
      "muted-foreground",
      "destructive",
    ];

    for (const token of [...tokensThatMustDiffer, "primary-foreground", "destructive-foreground"]) {
      expect(rootTokens, `:root should define --${token}`).toHaveProperty(token);
      expect(darkTokens, `.dark should override --${token}`).toHaveProperty(token);
    }

    // Background/surface tokens must actually repaint between themes. Some
    // "-foreground" tokens (e.g. white text on a red destructive button) are
    // legitimately identical in both themes - only the surface color changes
    // - so those are exempt from the inequality check above.
    for (const token of tokensThatMustDiffer) {
      expect(darkTokens[token], `--${token} should have a different value in dark mode`).not.toBe(
        rootTokens[token]
      );
    }
  });

  it("maps every :root token to a Tailwind theme color in @theme inline", () => {
    const rootTokens = extractTokens(css, ":root");
    const themeBlockMatch = /@theme inline\s*\{([^}]*)\}/.exec(css);
    expect(themeBlockMatch).not.toBeNull();
    const themeBlock = themeBlockMatch![1];

    for (const token of Object.keys(rootTokens)) {
      if (token === "radius") continue; // not a color token
      expect(themeBlock, `@theme inline should map --color-${token}`).toContain(`--color-${token}`);
    }
  });
});
