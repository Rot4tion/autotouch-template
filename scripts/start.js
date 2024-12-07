const atPlugin = require("../autotouch-plugin");
const config = require("../config");

try {
  new atPlugin(config).restartScript(() => {});
} catch (error) {}
