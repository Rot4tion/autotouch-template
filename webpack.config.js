const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const AutoTouchPlugin = require("./autotouch-plugin");
const config = require("./config");
module.exports = {
  entry: "./src/index.ts",
  module: {
    noParse: /https?:|cdn/,
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        exclude: /node_modules\/(axios|lodash)/,
      }),
    ],
    usedExports: true,
  },
  mode: "production",
  // externals: {
  //   axios: "axios",
  //   lodash: "lodash",
  // },
  externals: [
    ({ request }, callback) => {
      if (
        /^(https?:|\/)/.test(request) ||
        request == "lodash" ||
        request == "axios"
      ) {
        return callback(
          null,
          `commonjs ${request}`
        );
      }

      callback();
    },
  ],
  plugins: [
    // new webpack.BannerPlugin({
    //   banner: `const axios = require("axios");
    //   const lodash = require("lodash");`,
    //   raw: true,
    //   entryOnly: true,
    // }),
    new AutoTouchPlugin(config),
  ],
};
