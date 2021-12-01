const packageName = require("./package.json").name.split("@toitware/").pop();

const baseConfig = require("../../jest.config.base")(packageName);

module.exports = {
  ...baseConfig,
  setupFilesAfterEnv: ["<rootDir>/packages/cookie-consent/jest.setup.js"],
};
