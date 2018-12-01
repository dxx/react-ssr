const webpack = require("webpack");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

let env = "dev";
let isProd = false;
if (process.env.NODE_ENV === "production") {
  env = "prod";
  isProd = true;
}

const baseWebpackConfig = {
  mode: isProd ? "production" : "development",
  devtool: isProd ? "#source-map" : "#cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/dist/"  // 打包后输出路径以/dist/开头
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/img/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/fonts/[name].[hash:7].[ext]"
        }
      }
    ]
  },
  optimization: {
    // mode为production自动启用
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { 
          map: { inline: false }
        }
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": require("./" + env + ".env")
    })
  ]
}

module.exports = baseWebpackConfig;
