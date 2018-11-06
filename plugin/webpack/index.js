const SSRClientPlugin = require("./client-plugin");
const SSRServerPlugin = require("./server-plugin");

const getBundles = (manifest, moduleIds) => {
  return moduleIds.reduce((bundles, moduleId) => {
    return bundles.concat(manifest[moduleId]);
  }, []);
}

module.exports = {
  getBundles,
  SSRClientPlugin,
  SSRServerPlugin
}