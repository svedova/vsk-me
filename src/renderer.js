import React from "react";
import { StaticRouter } from "react-router-dom";
import Helmet from "react-helmet";
import App from "./App";

export { default as routes } from "./routes/server";

export default async (context, render) => {
  if (context.route && context.route.setup) {
    await context.route.setup(context);
  }

  const router = props => (
    <StaticRouter
      {...props}
      context={context}
      location={context.request.path}
    />
  );

  const body = render(<App Router={router} />);
  const data = Helmet.renderStatic();
  const head = Object.keys(data).map(k => data[k].toString()).join(""); // prettier-ignore

  return { body, head, headers: {} };
};
