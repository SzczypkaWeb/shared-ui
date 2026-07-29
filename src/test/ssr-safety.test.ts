// @vitest-environment node
//
// This suite runs under the plain Node.js environment (no jsdom), so
// `window` and `document` are undefined. If any component in the package
// touches them at module scope (i.e. outside of a component render, effect,
// or event handler), simply importing the package will throw a
// ReferenceError here. This keeps the library safe to import from
// server-rendering consumers such as Next.js.

import { describe, it, expect } from "vitest";

describe("SSR safety", () => {
  it("imports the package entry point without touching window/document at module scope", async () => {
    expect(typeof window).toBe("undefined");
    expect(typeof document).toBe("undefined");

    const mod = await import("../index");

    expect(typeof mod.Button).toBe("function");
    expect(typeof mod.Input).toBe("function");
    expect(typeof mod.Card).toBe("function");
  });
});
