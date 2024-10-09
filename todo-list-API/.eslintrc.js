module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  ignorePatterns: [
    "/dist/**/*", // Ignore built files.
    "/generated/**/*", // Ignore generated files.
    "jest.config.js",
    "/coverage/**/*", // Ignore coverage folder.
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "quotes": ["error", "double"],
    "import/no-unresolved": 0,
    "indent": ["error", 2],
    "require-jsdoc": 0, // Disable the JSDoc requirement
    "valid-jsdoc": 0, // Disable validation of JSDoc comments
    "new-cap": 0, // Disable the new-cap rule globally
    "linebreak-style": 0,
  },
};
