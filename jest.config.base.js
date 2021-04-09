// This is the base for all jest configs in packages/*
module.exports = (packageName) => ({
  name: packageName,
  displayName: packageName,

  preset: "ts-jest",
  rootDir: "../..",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  roots: [`<rootDir>/packages/${packageName}/src`],
  globals: {
    "ts-jest": {
      tsconfig: `<rootDir>/packages/${packageName}/tsconfig.json`,
    },
  },

  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/dist/**",
    "!**/vendor/**",
  ],
});
