// imports
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractCSSChunks = require("extract-css-chunks-webpack-plugin");

// Helper variables
const env = process.env.NODE_ENV || "production";
const root = path.resolve("./");
const isDev = env === "development";

module.exports = {
  // Providing the mode configuration option tells webpack to use its built-in optimizations accordingly.
  // @see https://webpack.js.org/concepts/mode/
  mode: env,

  // Entry files
  // @see https://webpack.js.org/concepts/entry-points/
  entry: {
    main: [path.join(root, "src/index.js")]
  },

  output: {
    filename: isDev ? undefined : "client.[hash].js",
    chunkFilename: "[name].[chunkhash].js",
    path: path.join(root, "dist"), // The path to the bundle directory
    publicPath: process.env.PUBLIC_PATH || "/" // Tell webpack to server always from the root
  },

  // @see https://webpack.js.org/configuration/resolve/
  resolve: {
    alias: {
      "@app": path.resolve(root, "src")
    }
  },

  // @see https://webpack.js.org/configuration/module/
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: () => (!isDev ? "[hash:base64:5].[ext]" : "[path][name].[ext]")
        }
      },
      {
        test: /\.scss$/,
        use: [
          !isDev ? ExtractCSSChunks.loader : "style-loader",

          // translates CSS into CommonJS
          {
            loader: "css-loader",
            options: {
              // Hash the class names
              localIdentName: !isDev
                ? "[hash:base64:5]"
                : "[name]__[local]___[hash:base64:5]",

              // Enables us to import scss files and use class names in JS
              modules: true,

              // So that you can import myWrapper instead of ["my-wrapper"]
              camelCase: true,

              minimize: {
                autoprefixer: {
                  add: true,
                  remove: true,
                  browsers: ["ie >= 11", "Safari >= 9"]
                },
                mergeIdents: true,
                discardUnused: true,
                safe: true,
                sourcemap: isDev,
                normalizeWhitespace: !isDev
              }
            }
          },

          // resolve @import statements
          "resolve-url-loader",

          // compile sass to css
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              includePaths: [path.join(root, "src/style")]
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin([path.join(root, "dist")], { allowExternal: true }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "production"
      )
    }),

    !isDev &&
      new ExtractCSSChunks({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].[contenthash].css"
      }),

    // The server will handle injecting files by itself.
    new HtmlWebpackPlugin(
      isDev
        ? {
            inject: true,
            template: path.join(root, "public/index.html")
          }
        : {
            inject: true,
            template: path.join(root, "public/index.html"),
            content: "{{content}}",
            head: "{{head}}",
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true
            }
          }
    )
  ].filter(i => i)
};
