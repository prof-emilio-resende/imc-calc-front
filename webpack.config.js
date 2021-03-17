const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const config = {
  entry: "./src/index.js",
  target: ["web", "es5"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {}
        }
      },
      {
        test: /\.[sa]css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
};

const plugins = [new MiniCssExtractPlugin()];

module.exports = (env, argv) => {
  if (argv.mode === "production") {
    plugins.push(
      new HtmlWebpackPlugin({
        hash: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          removeComments: true,
        },
        filename: "index.html",
        template: `${__dirname}/template.html`,
      })
    );
  }

  if (argv.mode === "development") {
    config.devtool = "source-map";
    plugins.push(
      new HtmlWebpackPlugin({
        hash: true,
        minify: false,
        filename: "index.html",
        template: `${__dirname}/template.html`,
      })
    );
  }

  config.plugins = plugins;
  config.mode = argv.mode;

  return config;
};
