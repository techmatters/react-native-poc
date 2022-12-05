const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const path = require("path");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  config.resolve.alias = {
    // why do this? The module `expo-camera` has a dependency that requires a different version of react
    // this causes react to enter into a hook loading death-spiral
    // see https://reactjs.org/warnings/invalid-hook-call-warning.html
    // this allows us to only load react once
    react: path.resolve("./node_modules/react"),
  };
  return config;
};
