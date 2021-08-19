const path = require("path");
const fs = require("fs");

const appDir = fs.realpathSync(process.cwd());
const resolvePath = (relativePath) => path.resolve(appDir, relativePath);

module.exports = (isDev = false) => ({
  appDir,
  appPath: resolvePath("."),
  appSrcDir: resolvePath("src"),
  appBuildDir: resolvePath("dist"),
  appRun: resolvePath("src/run"),
});
