import type { OG } from "./entry-server";
import React from "react";
import { matchPath, RouteProps } from "react-router";
import Async from "~/components/Async";

export type FetchDataFunc = (
  match: Record<string, string>
) => Promise<{ head: OG; context: any }>;

// const generateRoutes = async (): Promise<> => {
//   const files = await import.meta.glob("/src/pages/**/*.tsx");

//   return Object.keys(files)
//     .filter((file) => !file.split("/").pop()?.startsWith("_"))
//     .map((file) => ({
//       import: files[file] as () => Promise<{ default: React.FC }>,
//       path: file
//         .replace("/src/pages", "")
//         .replace(/\[/g, ":")
//         .replace(/\]/g, "")
//         .replace("index", "")
//         .replace(".tsx", ""),
//     }));
// };

interface Route {
  path: string;
  import: () => Promise<{ default: React.FC; fetchData?: FetchDataFunc }>;
}

const routes: Route[] = [
  {
    path: "/",
    import: () => import("./pages"),
  },
  {
    path: "/blog",
    import: () => import("./pages/blog"),
  },
  {
    path: "/blog/:category/:title",
    import: () => import("./pages/blog/[category]/[name]"),
  },
];

type RouteExtended = RouteProps & {
  data?: { head: OG };
};

const isServerSide = typeof window === "undefined";

export default async (
  url: string
): Promise<{ routes: RouteExtended[]; head?: OG; context: any }> => {
  const allRoutes: RouteExtended[] = [];
  let head: OG | undefined;
  let context: any;

  for (const route of routes) {
    let element: React.ReactNode;
    const match = matchPath(route.path, url);

    if (isServerSide) {
      const mod = await route.import();
      element = <mod.default />;

      if (match) {
        const data = await mod?.fetchData?.(
          match.params as Record<string, string>
        );

        if (data?.head) {
          head = data.head;
        }

        if (data?.context) {
          context = data.context;
        }
      }
    } else if (!isServerSide) {
      element = Async(url, route.import);
    }

    allRoutes.push({ path: route.path, element });
  }

  return { routes: allRoutes, head, context };
};
