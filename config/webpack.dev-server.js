// Required for proxy + history fallback
const convert = require("koa-connect");
const history = require("connect-history-api-fallback");
const proxy = require("http-proxy-middleware");
const path = require("path");

module.exports = {
  content: [path.resolve("./")],

  // http2: true,

  open: true,

  port: process.env.PORT || 3000,

  // The following breaks dev server, but would be cool to include it one day.
  // http2: true,

  add: app => {
    // This add-on will route all incoming requests for
    // "http://localhost:8080/api/!*" to "http://localhost:8081/api/!*" (note the port
    // change), and all remaining requests, which would otherwise result in 404,
    // will be rewritten to serve your "index.html", which is useful for single-page
    // applications.
    //
    // To remove the "/api" prefix when proxying the API requests, just add
    // "pathRewrite: { '^/api': '' }" to proxy's options.
    //
    // Proxy's docs: https://github.com/chimurai/http-proxy-middleware
    // Fallback's docs: https://github.com/bripkens/connect-history-api-fallback
    if (process.env.API_DOMAIN) {
      app.use(
        convert(
          proxy(process.env.API_DOMAIN, {
            target: process.env.API_PROXY_DOMAIN,
            changeOrigin: true,
            xfwd: true,
            cookieDomainRewrite: "localhost",
            pathRewrite: {
              "^/api": "/"
            }
          })
        )
      );
    }

    app.use(convert(history()));
  }
};
