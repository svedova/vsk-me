import { renderToString } from "react-dom/server";
import currentRoute, { renderHead } from "./router";

interface RenderReturn {
  status: number;
  content: string;
  head: string;
}

export const render = async (url: string): Promise<RenderReturn> => {
  const route = await currentRoute(url);
  const head = renderHead(route?.og);

  if (!route) {
    return { status: 404, content: "Page is not found", head };
  }

  return {
    status: 200,
    content: renderToString(<route.App match={route.match} />),
    head,
  };
};
