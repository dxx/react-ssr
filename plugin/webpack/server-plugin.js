const { isJS, onEmit, validateConfig } = require("./util");

module.exports = class SSRServerPlugin {
  constructor(opts = {}) {
    this.options = Object.assign({
      filename: "server-bundle.json",
    }, opts);
  }
  apply(compiler) {
    validateConfig(compiler);

    onEmit(compiler, "ssr-server-plugin" , (compilation, callback) => {
      const stats = compilation.getStats().toJson();
      const entryName = Object.keys(stats.entrypoints)[0];
      const entryInfo = stats.entrypoints[entryName];

      if (!entryInfo) {
        return callback();
      }

      const entryAssets = entryInfo.assets.filter(isJS);

      if (entryAssets.length > 1) {
        throw new Error(
          `Server-side bundle should have one single entry file. `
        )
      }

      const entry = entryAssets[0];

      const bundle = {
        entry,
        files: {},
        maps: {}
      }

      stats.assets.forEach(asset => {
        if (asset.name.match(/\.js$/)) {
          bundle.files[asset.name] = compilation.assets[asset.name].source();
        } else if (asset.name.match(/\.js\.map$/)) {
          bundle.maps[asset.name.replace(/\.map$/, "")] = JSON.parse(compilation.assets[asset.name].source());
        }
        // do not emit anything else for server
        delete compilation.assets[asset.name];
      })

      const json = JSON.stringify(bundle, null, 2)
      const filename = this.options.filename

      compilation.assets[filename] = {
        source: () => json,
        size: () => json.length
      }

      callback();
    });
  }
}