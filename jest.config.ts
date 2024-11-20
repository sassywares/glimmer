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
  coverageDirectory: "<rootDir>/jest/coverage",
  setupFilesAfterEnv: ["<rootDir>/jest/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "/cypress/", "/.next/"],
  testMatch: ["**/?(*.)+(test).tsx", "**/?(*.)+(test).ts"],
};

export default createJestConfig(config);
