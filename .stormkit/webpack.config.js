const path = require("path");

module.exports = {
  mode: "production",

  target: "node",

  // Entry files
  // @see https://webpack.js.org/concepts/entry-points/
  entry: {
    main: [path.join(__dirname, "./renderer.js")]
  },

  output: {
    filename: "index.js",
    path: __dirname, // The path to the bundle directory
    libraryTarget: "umd" // the umd format
  },
}
