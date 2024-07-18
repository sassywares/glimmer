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
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // The directory where Jest should output its coverage files
  coverageDirectory: "src/__tests__/coverage",

  // A list of paths to directories that Jest should use to search for files in
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    // ...
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default createJestConfig(config);
