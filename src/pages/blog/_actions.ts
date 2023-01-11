import { useContext, useEffect, useState } from "react";
import Context from "~/context";
import { FetchDataFunc } from "~/router";
import { Attributes, parseAttributes } from "./[category]/_actions";

interface Meta extends Attributes {
  url: string;
}

const files = import.meta.glob("/src/content/**/*.md", { as: "raw" });

export interface Post {
  url: string;
  name: string;
  category?: string;
  attributes: Attributes;
}

type Params = {
  category: string;
};

export const useWithPosts = ({ category }: Params) => {
  const cache = useContext(Context);
  const [allPosts, setAllPosts] = useState<Post[]>(cache.data || []);

  useEffect(() => {
    fetchData({ category }).then(({ context }: { context: Post[] }) => {
      setAllPosts(context);
    });
  }, []);

  return allPosts;
};

interface FetchDataProps {
  category?: string;
}

// Fetch all posts in the `src/content` folder.
export const fetchData: FetchDataFunc = async ({
  category,
}: FetchDataProps): Promise<{ head: any; context: Post[] }> => {
  const meta: Meta[] = [];

  for (const file in files) {
    const content = await files[file]();

    meta.push({
      ...parseAttributes(content, category),
      url: file.replace("/src/content", ""),
    });
  }

  const context = meta
    .map((attr) => {
      const pieces = attr.url.replace(/-/g, " ").replace(".md", "").split("/");
      const name = pieces.pop() || "";

      return {
        name,
        category: pieces.length >= 1 ? pieces.join("") : undefined,
        url: `/blog${attr.url.replace(".md", "")}`,
        attributes: {
          ...attr,
        },
      };
    })
    .filter((a) => a.attributes.draft !== "true")
    .sort((a, b) => {
      const dateA: string = a.attributes.date || "";
      const dateB: string = b.attributes.date || "";
      return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
    });

  return { context, head: {} };
};
