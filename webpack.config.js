const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: "./src/index.tsx",
    target: "web",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "client_bundle.js",
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
          use: "ts-loader",
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            }
          }
        },
        {
          test: /\.css$/i, // styles files
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          type: "asset/resource"
        }
      ]
    }
  }
}