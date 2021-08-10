const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const outputFolder = "docs";

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.join(__dirname, outputFolder),
    filename: "index.[contenthash].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[hash][ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: path.join(__dirname, "src", "assets", "favicon.ico"),
      template: path.join(__dirname, "src", "index.html"),
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, outputFolder),
    hot: true,
  },
};
