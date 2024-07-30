const packageName = require("./package.json").name.split("@toit/").pop();

const baseConfig = require("../../jest.config.base")(packageName);

module.exports = {
  ...baseConfig,
};
