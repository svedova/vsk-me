import React from "react";
import { ServerStyleSheet } from "styled-components";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { matchPath } from "react-router-dom";
import Helmet from "react-helmet";
import App from "./App";
import routes from "./routes/server";
import Storyblok from "./storyblok";

const setup = async (context, res) => {
  try {
    return await context.route.setup(context);
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
    route: routes.find(r => matchPath(req.path, r)),
    state: {},
    request: req,
    Storyblok
  };

  if (context.route && context.route.setup) {
    log(req, { statusCode: 200 });

    if ((await setup(context, res)) === null) {
      return;
    }
  }

  if (!context.route) {
    status = 404;
  }

  const router = props => (
    <StaticRouter {...props} context={context} location={req.path} />
  );

  const sheet = new ServerStyleSheet();
  const jsx = sheet.collectStyles(
    <App
      Router={router}
      request={req}
      response={res}
      contextData={context.state}
    />
  );

  const body = renderToString(jsx);
  const data = Helmet.renderStatic();
  const head = Object.keys(data)
    .map(k => data[k].toString())
    .concat(sheet.getStyleTags())
    .join("");

  res.status(status);
  log(req, context);

  const inject = context.state
    ? `<script>window.__data__=${JSON.stringify(context.state)}</script>`
    : "";

  return res.send({ content: body, head, context: inject });
};
