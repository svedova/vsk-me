import React from "react";
import { StaticRouter } from "react-router-dom";
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

export default {
  routes,

  renderer: async (context, render) => {
    if (context.route && context.route.setup) {
      const resp = await setup(context);

      if (resp) {
        return resp;
      }
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
  }
};
