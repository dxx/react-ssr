const webpack = require("webpack");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

let env = "dev";
let isProd = false;
let prodPlugins = [];
if (process.env.NODE_ENV === "production") {
  env = "prod";
  isProd = true;
  prodPlugins = [
    new UglifyJsPlugin({sourceMap: true})
  ];
}

const baseWebpackConfig = {
  devtool: isProd ? "#source-map" : "#cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/dist/"  // 打包后输出路径以/dist/开头
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
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
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: "static/fonts/[name].[hash:7].[ext]"
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": require("./" + env + ".env")
    }),
    ...prodPlugins
  ]
}

module.exports = baseWebpackConfig;
