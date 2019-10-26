import React from "react";
import { ServerStyleSheet } from "styled-components";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { matchPath } from "react-router-dom";
import Helmet from "react-helmet";
import App from "./App";
import routes from "./routes/server";

const setup = async (context, res) => {
  try {
    await context.route.setup(context);
  } catch (e) {
    res.status(500);
    res.send("Something went wrong");
  }
};

const log = (req, res) => {
  console.log({
    response: res.statusCode,
    path: req.url,
    method: req.method,
    ua: req.header("User-Agent"),
    headers: req.headers
  });
};

export default async (req, res) => {
  let status = 200;
  const context = {
    route: routes.find(r => matchPath(req.path, r))
  };

  if (context.route && context.route.setup) {
    log(req, { statusCode: 200 });
    return await setup(context, res);
  }

  if (!context.route) {
    status = 404;
  }

  const router = props => (
    <StaticRouter {...props} context={context} location={req.path} />
  );

  const sheet = new ServerStyleSheet();
  const jsx = sheet.collectStyles(
    <App Router={router} request={req} response={res} />
  );

  const body = renderToString(jsx);
  const data = Helmet.renderStatic();
  const head = Object.keys(data)
    .map(k => data[k].toString())
    .concat(sheet.getStyleTags())
    .join("");

  res.status(status);
  log(req, context);
  return res.send({ content: body, head });
};
