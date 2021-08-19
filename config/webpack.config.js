const path = require("path");

const paths = require("./paths");

function genConfig(webpackEnv) {
  const isDev = webpackEnv === "development";
  const isProd = webpackEnv === "production";

  const { appDir, appRun, appBuildDir } = paths(isDev);

  return {
    mode: process.env.NODE_ENV || "development",
    entry: appRun,
    output: {
      path: appBuildDir,
      filename: "run.bundle.js",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
      modules: ["node_modules", path.resolve(appDir, "node_modules")],
    },
    module: {
      rules: [],
    },
    plugins: [],
    //
    // devtool source-map
    devtool: isDev ? "inline-source-map" : false,
    //
    // misc
    // Stop compilation early in production
    bail: isProd,
    //
    // workaround dev-server bug
    // See https://github.com/webpack/webpack-dev-server/issues/2758#issuecomment-710086019
    target: "node",
  };
}

module.exports = (_, argv) => {
  process.env.NODE_ENV = argv.mode;
  if (argv.mode === "development") {
    return genConfig(argv.mode);
  }
  return genConfig("production");
};
