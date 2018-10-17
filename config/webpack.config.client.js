const path = require("path");
const webpack = require("webpack");
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
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: ["babel-loader", "eslint-loader"],
        exclude: /node_modules/
      },
      ...util.styleLoaders({
        sourceMap: isProd ? true : false,
        usePostCSS: true,
        extract: isProd ? true : false
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function(module) {
        // 阻止.css文件资源打包到vendor chunk中
        if(module.resource && /\.css$/.test(module.resource)) {
          return false;
        }
        // node_modules目录下的模块打包到vendor chunk中
        return module.context && module.context.includes('node_modules');
      }
    }),
    // 分离webpack引导模块
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
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
