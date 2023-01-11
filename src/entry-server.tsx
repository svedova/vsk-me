import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import createRoutes from "./router";
import App from "./App";
import Context from "./context";

interface RenderReturn {
  status: number;
  content: string;
  head: string;
}

export interface OG {
  title?: string;
  description?: string;
  url?: string;
  image?: {
    url?: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  twitter?: {
    site?: string; // @username for the website used in the card footer.
    creator?: string; // @username for the content creator / author
    card?: "summary" | "summary_large_image" | "app" | "player";
  };
}

const defaultSEO: OG = {
  title: "Home page",
  description:
    "This is my personal website. Here, I share updates about my life and write about tech and startups.",
  image: {},
  twitter: {
    card: "summary",
    creator: "@savasvedova",
  },
};

const renderHead = (overwrite?: OG) => {
  const tags: OG = {
    ...defaultSEO,
    ...overwrite,
    image: {
      ...defaultSEO.image,
      ...overwrite?.image,
    },
    twitter: { ...defaultSEO.twitter, ...overwrite?.twitter },
  };

  const path = tags.url?.replace(/^\//, "") || "";

  const baseTags = [
    `
      <title>Savas Vedova | ${tags.title}</title>
      <meta name="description" content="${tags.description}" />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Savas Vedova | ${tags.title}" />
      <meta property="og:url" content="https://vsk.me/${path}" />
      <meta property="og:description" content="${tags.description}" />
      <meta name="twitter:card" content="${tags.twitter!.card}" />
      <meta name="twitter:creator" content="${tags.twitter!.creator}" />
    `
      .trim()
      .replace(/>\s+</g, "><"),
  ];

  return baseTags.join("");
};

export const render = async (url: string): Promise<RenderReturn> => {
  const { routes, head, context } = await createRoutes(url);

  return {
    status: 200,
    head: renderHead(head),
    content:
      renderToString(
        <Context.Provider value={{ data: context }}>
          <StaticRouter location={url}>
            <App routes={routes} />
          </StaticRouter>
        </Context.Provider>
      ) + `<script>window.CONTEXT = ${JSON.stringify(context)}</script>`,
  };
};
