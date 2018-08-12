// imports
const path = require("path");
const webpack = require("webpack");

// Helper variables
const env = process.env.NODE_ENV || "production";
const root = path.resolve("./");

module.exports = {
  // Providing the mode configuration option tells webpack to use its built-in optimizations accordingly.
  // @see https://webpack.js.org/concepts/mode/
  mode: env,

  target: "node",

  // Entry files
  // @see https://webpack.js.org/concepts/entry-points/
  entry: {
    main: [path.join(root, "src/App.js")]
  },

  output: {
    chunkFilename: "[name].[chunkhash].js",
    filename: "server.[hash].js",
    path: path.join(root, "dist"), // The path to the bundle directory
    library: "hello-world",
    libraryTarget: "umd", // the umd format
    umdNamedDefine: true // setting this to true will name the AMD module
  },

  // @see https://webpack.js.org/configuration/resolve/
  resolve: {
    alias: {
      "@app": path.join(root, "src")
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
          name: "[hash:base64:5].[ext]"
        }
      },
      {
        test: /\.scss$/,
        use: [
          // translates CSS into CommonJS
          {
            loader: "css-loader/locals",
            options: {
              // Hash the class names
              localIdentName: "[hash:base64:5]",

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
                sourcemap: false,
                normalizeWhitespace: true
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
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "production"
      )
    }),

    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
};
