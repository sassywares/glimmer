/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import nextJest from "next/jest.js";

import type { Config } from "jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config: Config = {
  clearMocks: true,
  preset: "ts-jest",
  collectCoverage: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  coverageDirectory: "src/__tests__/unit/coverage",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/e2e/"],
  testMatch: ["**/?(*.)+(spec|test).[tj]sx", "**/?(*.)+(spec|test).ts"],
};

export default createJestConfig(config);
