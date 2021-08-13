const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: path.join(__dirname, "src", "assets", "favicon.ico"),
      template: path.join(__dirname, "src", "index.html"),
    }),
  ],
};
