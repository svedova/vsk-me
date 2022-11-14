import React from "react";
import { matchPath, PathMatch } from "react-router";

interface OG {
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

export type UseFetchDataFunc = (match: PathMatch) => Promise<OG>;

interface Route {
  path: string;
  import: () => Promise<{
    default: React.FC;
    useFetchData?: UseFetchDataFunc;
  }>;
}

const generateRoutes = async (): Promise<Array<Route>> => {
  const files = await import.meta.glob("/src/pages/**/*.tsx");

  return Object.keys(files)
    .filter((file) => !file.split("/").pop()?.startsWith("_"))
    .map((file) => ({
      import: files[file] as () => Promise<{ default: React.FC }>,
      path: file
        .replace("/src/pages", "")
        .replace(/\[/g, ":")
        .replace(/\]/g, "")
        .replace("index", "")
        .replace(".tsx", ""),
    }));
};

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

export const renderHead = (overwrite?: OG) => {
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
      <meta property="og:title" content="Savas Vedova | {tags.title}" />
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

export interface RouterReturn {
  path: string;
  og?: OG;
  match: PathMatch;
  App: React.FC<{ match: PathMatch }>;
}

export default async (url: string): Promise<RouterReturn | void> => {
  const routes = await generateRoutes();
  let App;

  for (const route of routes) {
    const match = matchPath(route.path, url);

    if (match) {
      const mod = await route.import();
      let og: OG = {};
      App = mod.default;

      if (mod.useFetchData) {
        og = await mod.useFetchData(match);
      }

      return { path: route.path, App, match, og };
    }
  }
};
