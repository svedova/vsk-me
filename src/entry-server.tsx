import { StaticRouter } from "react-router-dom/server";
import { renderToString } from "react-dom/server";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import serverless from "@stormkit/serverless";
import createRoutes from "./routes";
import Context from "./context";
import App from "./App";

interface RenderReturn {
  status: number;
  content: string;
  head: string;
}

export type RenderFunction = (url: string) => Promise<RenderReturn>;

const defaultSEO: SEO = {
  title: "Savas Vedova",
  description:
    "Personal website of Savas Vedova. Reach me out, or follow my blog!",
  domain: {
    name: "Savas Vedova",
    url: "https://vsk.me",
  },
  twitter: {
    card: "summary",
    creator: "@savasvedova",
  },
};

export const render: RenderFunction = async (url) => {
  const { routes, head, context } = await createRoutes(url);
  const tags = {
    ...defaultSEO,
    ...head,
  };

  // Prefix the title with the domain.name property.
  tags.title =
    `${tags.domain?.name ? tags.domain.name + " | " : ""}` + tags.title;

  return {
    status: 200,
    content:
      renderToString(
        <Context.Provider value={context}>
          <StaticRouter location={url}>
            <App routes={routes} />
          </StaticRouter>
        </Context.Provider>
      ) +
      (context
        ? `<script>window.CONTEXT = ${JSON.stringify(context)}</script>`
        : ""),
    head: [
      `<title>${tags.title}</title>`,
      `<meta charset="utf-8" />`,
      `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`,
      `<meta name="description" content="${tags.description}" />`,
      `<meta property="og:title" content="${tags.title}" />`,
      `<meta property="og:url" content="${tags.domain?.url}" />`,
      `<meta property="og:description" content="${tags.description}" />`,
      `<meta property="og:image" content="${tags.domain?.url}/logo.svg" />`,
      `<meta name="twitter:card" content="${tags.twitter!.card}" />`,
      `<meta name="twitter:creator" content="${tags.twitter!.creator}" />`,
      `<meta name="twitter:title" content="${tags.title}" />`,
      `<meta name="twitter:description" content="${tags.description}" />`,
      `<link rel="icon" type="image/svg+xml" href="/logo.svg" />`,
    ]
      .join("\n")
      .trim(),
  };
};
