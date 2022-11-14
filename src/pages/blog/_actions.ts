import type { PathMatch } from "react-router";
import { Attributes, parseAttributes } from "./[category]/_actions";
import { useEffect, useState } from "react";

interface Meta extends Attributes {
  url: string;
}

const files = import.meta.glob("/src/content/**/*.md", { as: "raw" });
let cache: Post[] = [];

export interface Post {
  url: string;
  name: string;
  category?: string;
  attributes: Attributes;
}

export const useWithPosts = (match: PathMatch) => {
  const [allPosts, setAllPosts] = useState<Post[]>(cache);

  useEffect(() => {
    useFetchData(match).then((posts) => {
      setAllPosts(posts);
    });
  }, []);

  return allPosts;
};

export const useFetchData = async (match: PathMatch): Promise<Post[]> => {
  const attrs: Meta[] = [];

  for (const file in files) {
    const content = await files[file]();
    attrs.push({
      ...parseAttributes(content, match),
      url: file.replace("/src/content", ""),
    });
  }

  cache = attrs
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

  return cache;
};
