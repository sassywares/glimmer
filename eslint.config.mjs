import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

import js from "@eslint/js";
import path from "node:path";
import perfectionist from "eslint-plugin-perfectionist";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  ...compat.extends(
    "prettier",
    "next/core-web-vitals",
    "plugin:perfectionist/recommended-natural",
    "plugin:perfectionist/recommended-line-length",
    "plugin:perfectionist/recommended-alphabetical",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ),
  {
    rules: {
      "perfectionist/sort-array-includes": [
        "error",
        {
          order: "asc",
          "spread-last": true,
          type: "line-length",
        },
      ],

      "perfectionist/sort-enums": [
        "error",
        {
          order: "asc",
          type: "line-length",
        },
      ],

      "perfectionist/sort-exports": [
        "error",
        {
          order: "asc",
          type: "line-length",
        },
      ],

      "perfectionist/sort-imports": [
        "error",
        {
          order: "asc",
          type: "line-length",

          groups: [
            ["style", "side-effect-style"],
            ["react", "next"],
            "builtin",
            ["side-effect", "parent", "sibling", "index"],
            "external",
            "internal",
            "unknown",
            "object",
            [
              "type",
              "internal-type",
              "parent-type",
              "sibling-type",
              "index-type",
              "react-type",
              "next-type",
            ],
          ],

          "custom-groups": {
            value: {
              react: ["react", "react/**", "react-**"],
              next: ["next", "next/**", "next-**", "next-**/**"],
            },

            type: {
              "react-type": ["react", "react/**", "react-**"],
              "next-type": ["next", "next/**", "next-**", "next-**/**"],
            },
          },

          "newlines-between": "always",
          "internal-pattern": ["@/**"],
        },
      ],

      "perfectionist/sort-interfaces": [
        "error",
        {
          order: "asc",
          type: "line-length",
        },
      ],

      "perfectionist/sort-jsx-props": [
        "error",
        {
          order: "asc",
          type: "line-length",
          groups: ["shorthand", "unknown", "multiline"],
        },
      ],

      "perfectionist/sort-named-exports": [
        "error",
        {
          order: "asc",
          type: "line-length",
        },
      ],

      "perfectionist/sort-named-imports": [
        "error",
        {
          order: "asc",
          type: "line-length",
        },
      ],

      "perfectionist/sort-object-types": [
        "error",
        {
          order: "asc",
          type: "line-length",
        },
      ],

      "perfectionist/sort-objects": [
        "error",
        {
          order: "asc",
          type: "line-length",
        },
      ],

      "perfectionist/sort-union-types": [
        "error",
        {
          order: "asc",
          type: "line-length",
        },
      ],

      "perfectionist/sort-intersection-types": [
        "error",
        {
          order: "asc",
          type: "line-length",
        },
      ],
      // Consistently import navigation APIs from `@/navigation`
      "no-restricted-imports": [
        "error",
        {
          name: "next/link",
          message: "Please import from `@/navigation` instead.",
        },
        {
          name: "next/navigation",
          importNames: [
            "redirect",
            "permanentRedirect",
            "useRouter",
            "usePathname",
          ],
          message: "Please import from `@/navigation` instead.",
        },
      ],
    },
  },
];
