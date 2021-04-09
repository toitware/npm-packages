// This config has been initially copied from:
// https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
    // This is just the default `testMatch` with the only difference, that utils
    // inside __tests__ folders are not executed as tests:
    "!**/__tests__/utils/**/*",
  ],
  projects: ["<rootDir>/packages/*"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|json)$": `identity-obj-proxy`,
  },
  testPathIgnorePatterns: [`**/node_modules`, `\\.cache`, `<rootDir>.*/public`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  // setupFiles: [`<rootDir>/loadershim.js`],

  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/dist/**",
    "!**/vendor/**",
  ],
};
