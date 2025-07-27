import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
        },
      ],

      // General JavaScript rules (no TypeScript prefix needed)
      "prefer-const": "error",
      "no-var": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",

      // React rules (already included in next/core-web-vitals)
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/display-name": "off",
      "react/no-unescaped-entities": "off",

      // Next.js specific rules
      "@next/next/no-img-element": "error",
      "@next/next/no-html-link-for-pages": "error",
    },
  },
  {
    files: ["**/*.config.{js,ts,mjs}"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  {
    files: ["**/seed/**/*.ts", "**/scripts/**/*.ts"],
    rules: {
      "no-console": "off",
    },
  },
];

export default eslintConfig;