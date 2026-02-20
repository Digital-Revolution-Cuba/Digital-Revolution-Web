/** @type {import("prettier").Config} */
export default {
  // ── Core formatting ───────────────────────────────────────────────────────
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  trailingComma: "es5",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  endOfLine: "lf",

  // ── Plugins (order matters: tailwindcss MUST be last) ────────────────────
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],

  // ── Parser overrides ─────────────────────────────────────────────────────
  overrides: [
    {
      // Astro files must use the astro parser explicitly
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
    {
      // JSON/JSONC: no trailing commas allowed
      files: ["*.json", "*.jsonc", "*.json5"],
      options: {
        trailingComma: "none",
        parser: "json",
      },
    },
    {
      // Markdown: preserve prose wrap
      files: ["*.md", "*.mdx"],
      options: {
        proseWrap: "preserve",
      },
    },
    {
      // YAML: single quotes preferred
      files: ["*.yml", "*.yaml"],
      options: {
        singleQuote: true,
      },
    },
  ],
};
