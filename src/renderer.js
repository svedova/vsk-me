import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { matchPath } from "react-router-dom";
import Helmet from "react-helmet";
import App from "./App";
import routes from "./routes/server";

const setup = async context => {
  try {
    const resp = await context.route.setup(context);

    if (typeof resp === "object" && resp.body) {
      return resp;
    }
  } catch (e) {
    return {
      status: 500,
      body: "Something went wrong..."
    };
  }
};

export default async (req, res) => {
  let status = 200;
  const context = {
    route: routes.find(r => matchPath(req.path, r))
  };

  if (context.route && context.route.setup) {
    const resp = await setup(context);

    if (resp) {
      return res.send(resp);
    }
  }

  if (!context.route) {
    status = 404;
  }

  const router = props => (
    <StaticRouter {...props} context={context} location={req.path} />
  );

  const body = renderToString(<App Router={router} />);
  const data = Helmet.renderStatic();
  const head = Object.keys(data).map(k => data[k].toString()).join(""); // prettier-ignore

  return res.send({ body: { content: body, head }, headers: {}, status });
};
