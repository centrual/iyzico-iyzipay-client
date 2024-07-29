/* eslint-disable */

// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = tseslint.config(
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

export default eslintConfig;