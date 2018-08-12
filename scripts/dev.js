//
// Setup environment variables
//
process.env.NODE_ENV = "development";
process.env.BABEL_ENV = "development";
process.env.PORT = process.env.PORT || 3000;

//
// Init webpack-dev-server
//

const devServer = require("webpack-serve");
const config = require("../config/webpack.client");
config.serve = require("../config/webpack.dev-server");

const port = process.env.PORT;
const host = "0.0.0.0";
const argv = {};

devServer(argv, { config }).then(server => {
  server.on("listening", ({ server }) => {
    console.log("webpack-serve listening at https://" + host + ":" + port);

    ["SIGINT", "SIGTERM"].forEach(function(sig) {
      process.on(sig, function() {
        server.close();
        process.exit();
      });
    });
  });
});
