const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: isProduction ? "./index.ts" : "./src/index.tsx",
    target: "web",  // Ensures compatibility with web browsers
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.js",
      clean: true,
      library: {
        name: "react-webpack-lib-tith",
        type: "umd"  // Ensures compatibility with different module systems
      },
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
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  ident: 'postcss',
                  plugins: [
                    require('tailwindcss'),
                    require('autoprefixer'),
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          type: "asset/resource"  // Manages static assets
        }
      ]
    },
    devServer: { port: 3030 },  // Configuration for webpack-dev-server
    devtool: isProduction ? false : 'eval-source-map',  // Generate source maps only for development
  }
}
