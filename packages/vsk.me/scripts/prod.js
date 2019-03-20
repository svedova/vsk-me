//
// Setup environment variables
//
process.env.NODE_ENV = "production";
process.env.BABEL_ENV = "production";
process.env.PORT = process.env.PORT || 3000;

// Resolve the package root:
const chalk = require("chalk");
const webpack = require("webpack");
const config = require("../config/webpack.client");
const compiler = webpack(config);

compiler.run((err, stats) => {
  if (err) {
    console.log(chalk.red("Failed to compile.\n"));
    process.exit(1);
  }

  console.log(chalk.green("Compiled successfully.\n"));
  console.log(stats.toString({ chunks: false, children: false }));
});
