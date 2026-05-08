import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

export default createJestConfig({
  testEnvironment: "jsdom",
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" },
  setupFilesAfterFramework: ["<rootDir>/jest.setup.ts"],
} as any);
