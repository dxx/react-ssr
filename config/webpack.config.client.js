const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const baseWebpackConfig = require("./webpack.config.base");
const util = require("./util");

const isProd = process.env.NODE_ENV === "production";

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: "./src/entry-client.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "static/js/[name].[chunkhash].js",
    publicPath: "/dist/"  // 打包后输出路径以/dist/开头
  },
  module: {
    rules: util.styleLoaders({
        sourceMap: isProd ? true : false,
        usePostCSS: true,
        extract: isProd ? true : false
      })
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html"
    })
  ]
});

if (isProd) {
  webpackConfig.plugins.push(
    new ExtractTextPlugin({
      filename: "static/css/[name].[contenthash].css"
    })
  );
}

module.exports = webpackConfig;
