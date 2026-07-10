import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTypescript,
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
      // General JavaScript rules
      "prefer-const": "error",
      "no-var": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      // React rules
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
  globalIgnores(["node_modules/**", ".next/**", "out/**", "build/**"]),
]);

export default eslintConfig;
