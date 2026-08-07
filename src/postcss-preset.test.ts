import { describe, expect, it } from "vitest";
// @ts-expect-error - postcss-preset.cjs is a plain CommonJS file, not typed.
import postcssPreset from "./postcss-preset.cjs";

describe("postcss-preset", () => {
  it("runs the Tailwind v4 postcss plugin", () => {
    expect(Object.keys(postcssPreset.plugins)).toEqual(
      expect.arrayContaining(["@tailwindcss/postcss"])
    );
  });
});
