const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: isProduction ? "./src/main.ts" : "./src/index.tsx",
    target: "web",  // Ensures compatibility with web browsers
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.js",
      clean: true,
      globalObject: 'this',
      library: {
        name: "sabai-ui-dev",
        type: "umd"  // Ensures compatibility with different module systems
      },
      assetModuleFilename: 'images/[hash][ext][query]',
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "src/index.html",
      })
    ],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: "ts-loader",  // Compiles TypeScript files
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader"
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          type: "asset/resource"  // Manages static assets
        }
      ]
    },
    externals: {
      react: 'react',
      'react-dom': 'react-dom'
    },
    devServer: { port: 3030 },  // Configuration for webpack-dev-server
    devtool: isProduction ? false : 'eval-source-map',  // Generate source maps only for development
  }
}
