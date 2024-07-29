// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.eslint.json",
      },
    },
  },
  {
    ignores: ["dist/**/*", "node_modules/**/*"],
  },
  {
    files: ["**/*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
  prettierConfig,
);
