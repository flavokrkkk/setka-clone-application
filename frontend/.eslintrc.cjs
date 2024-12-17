module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "simple-import-sort", "prettier"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^react"],
          ["@reduxjs/toolkit"],
          ["^react-router-dom", "^react-router"],
          ["^@/app", "^@/pages", "^@/widgets", "^@/features", "^@/entities", "^@/shared"]
        ]
      }
    ],
    "prettier/prettier": "error"
  }
}
