"use strict";
const fs = require("fs");
const path = require("path");
const { renderToString } = require("react-dom/server");
const { matchPath } = require("react-router-dom");

/**
 * Return the function to render the content.
 *
 * @param server
 * @param params
 * @return {*}
 */
function getContent(server, params) {
  if (typeof server === "function") {
    return server(params);
  }

  if (server && typeof server.content === "function") {
    return server.content(params);
  }

  throw new Error(
    "Invalid export: Expected either a function or an object with content function."
  );
}

/**
 * Return the function - if any - to render the head.
 *
 * @param server
 * @param params
 * @return {*}
 */
function getHead(server, params) {
  if (server && typeof server.head === "function") {
    return server.head(params);
  }
}

/**
 * Given an array of routes, find the first one that matches.
 *
 * @param routes
 * @param location
 * @return {*}
 */
function matchRoute(routes, location) {
  return routes.find(r => matchPath(location, r));
}

/**
 * This is the entry point of the lambda function.
 *
 * @param event
 * @param gwContext
 * @param callback
 * @return {Promise<void>}
 */
exports.handler = async (event, gwContext, callback) => {
  let { path: location } = event;
  location = location.replace(/^\/ws1/, "")

  // This is the context of the request
  const context = {};

  // Grab the server file and the routes
  const { default: server } = require("./server"); // prettier-ignore
  const { routes = [], setup } = global.stormkit || {};
  const route = matchRoute(routes, location);

  // Read the index.html file
  let html = fs.readFileSync(path.resolve("./index.html"), "utf8");

  // This is the global setup, for instance use it to configure the store
  if (typeof setup === "function") {
    await setup({ context, location });
  }

  // If the route is dynamic let's import the content first
  if (route) {
    if (typeof route.component.Import === "function") {
      await route.component.Import();
    }

    if (typeof route.setup === "function") {
      await route.setup(req, context);
    }
  }

  // Let's render the content and the head, if any.
  const content = renderToString(getContent(server, { location, context }));
  const head = getHead(server, { location, context });

  const appContentRegex = /<app-content\s*\/>/;
  const appHeadRegex = /<app-head\s*\/>/;

  if (html.match(appContentRegex)) {
    html = html.replace(appContentRegex, content);
  } else {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${content}</div>`
    );
  }

  if (head) {
    if (html.match(appHeadRegex)) {
      html = html.replace(appHeadRegex, content);
    } else {
      html = html.replace(/(<head\s?[^>]*>)/, "$1" + head);
    }
  }

  callback(null, {
    statusCode: context.status || 200,
    headers: {
      "Content-Type": "text/html",
      ...(context.headers || {})
    },
    body: html
  });
};
