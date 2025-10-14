module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: { project: ["./tsconfig.json"] },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:svelte/recommended",
    "prettier",
  ],
  overrides: [{ files: ["*.svelte"], processor: "svelte/svelte" }],
  env: { browser: true, es2021: true },
};
