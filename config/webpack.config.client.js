const path = require("path");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const baseWebpackConfig = require("./webpack.config.base");
const util = require("./util");

const isProd = process.env.NODE_ENV === "production";

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: "./src/entry-client.js"
  },
  output: {
    filename: "static/js/[name].[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: [ "babel-loader", "eslint-loader" ],
        include: [ path.resolve(__dirname, "../src") ]
      },
      ...util.styleLoaders({
        sourceMap: isProd ? true : false,
        usePostCSS: true,
        extract: isProd ? true : false
      })
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all",  // chunk选择范围
      cacheGroups: {
        vendor: {
          test: function(module) {
            // 阻止.css文件资源打包到vendor chunk中
            if(module.resource && /\.css$/.test(module.resource)) {
              return false;
            }
            // node_modules目录下的模块打包到vendor chunk中
            return module.context && module.context.includes("node_modules");
          }
        }
      }
    },
    // webpack引导模块
    runtimeChunk: {
      name: "manifest"
    }
  },
  plugins: [
    // 生成 loadable-stats.json
    new LoadablePlugin()
  ]
});

if (isProd) {
  webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash].css"
    })
  );
}

module.exports = webpackConfig;
