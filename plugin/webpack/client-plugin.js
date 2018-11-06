const { isJS, onEmit } = require("./util");

const buildManifest = (compiler, compilation) => {
  let context = compiler.options.context;
  let manifest = {};

  let forEachModule = (chunk, callback) => {
    if (chunk.modulesIterable) {
      // Webpack >= 4.0.0
      chunk.modulesIterable.forEach(callback);
    } else {
      // Webpack < 4.0.0
      chunk.forEachModule(callback);
    }
  }

  compilation.chunks.forEach(chunk => {
    chunk.files.forEach(file => {
      forEachModule(chunk, module => {
        let id = module.id;
        let name = typeof module.libIdent === "function" ? module.libIdent({ context }) : null;
        if (!name || /node_modules/.test(name) && isJS(name)) {
          return;
        }
        let publicPath = require("url").resolve(compilation.outputOptions.publicPath || "", file);
        
        let currentModule = module;
        if (module.constructor.name === "ConcatenatedModule") {
          currentModule = module.rootModule;
        }
        if (!manifest[currentModule.rawRequest]) {
          manifest[currentModule.rawRequest] = [];
        }

        manifest[currentModule.rawRequest].push({ id, name, file, publicPath });
      });
    });
  });

  return manifest;
}

module.exports = class SSRClientPlugin {
  constructor(opts = {}) {
    this.options = Object.assign({
      filename: "client-manifest.json",
    }, opts);
  }
  apply(compiler) {
    onEmit(compiler, "ssr-client-plugin" , (compilation, callback) => {
      const manifest = buildManifest(compiler, compilation);
      var json = JSON.stringify(manifest, null, 2);
      compilation.assets[this.options.filename] = {
        source: () => json,
        size: () => json.length
      }
      callback();
    });
  }
}