/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/typescript",
  ],
  overrides: [
    {
      files: ["client/**/*.{js,jsx,ts,tsx}"],
      env: {
        browser: true,
      },
      // ... other client-specific settings
    },
    // ... other overrides
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    project: [
      "./tsconfig.json",
      "./client/tsconfig.json",
      "./server/tsconfig.json",
      "./tsconfig.eslint.json",
    ],
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  plugins: [
    "no-relative-import-paths",
    "react-refresh",
    "eslint-plugin-import-helpers",
  ],
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-relative-import-paths/no-relative-import-paths": [
      "error",
      {
        allowSameFolder: true,
        rootDir: "client/src",
        prefix: "@",
      },
    ],
    "import-helpers/order-imports": [
      "error",
      {
        alphabetize: { ignoreCase: true, order: "asc" },
        groups: ["module", [("sibling", "parent")], "absolute", "index"],
        newlinesBetween: "always",
      },
    ],
  },
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".js", ".jsx", ".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
