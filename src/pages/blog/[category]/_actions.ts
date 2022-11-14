import { useEffect, useState } from "react";
import { PathMatch } from "react-router";

const files = import.meta.glob("/src/content/**/*.md", { as: "raw" });
const cache: Record<string, { content: string; attributes: Attributes }> = {};

export interface Attributes {
  title?: string;
  date?: string; // yyyy-mm-dd
  description?: string;
  category?: string;
  draft?: string;
}

interface WithContentReturnValue {
  content: string;
  attributes: Attributes;
}

export const useWithContent = (match: PathMatch): WithContentReturnValue => {
  const cached = cache[match.params.name!];
  const [attributes, setAttributes] = useState<Attributes>(cached?.attributes);
  const [content, setContent] = useState<string>(cached?.content);

  useEffect(() => {
    useFetchData(match).then((data) => {
      if (data?.content) {
        setAttributes(data.attributes);
        setContent(data.content);
      }
    });
  }, []);

  return { content, attributes };
};

export const parseAttributes = (
  content: string,
  match: PathMatch
): Attributes => {
  const attrs: Attributes = {};
  const index = content.indexOf("---", 2);

  if (index > -1) {
    content
      .slice(3, index)
      .split(/\n/g)
      .filter((i) => i)
      .forEach((str) => {
        const [key, value] = str.split(":");
        attrs[key.toLowerCase() as keyof Attributes] = value.trim();
      });
  }

  attrs.category = match.params.category;
  return attrs;
};

export const useFetchData = async (
  match: PathMatch
): Promise<WithContentReturnValue | void> => {
  let file;

  if (match.params.category) {
    file =
      files[`/src/content/${match.params.category}/${match.params.name}.md`];
  } else {
    file = files[`/src/content/${match.params.name}.md`];
  }

  if (!file) {
    return;
  }

  const content = await file();
  const index = content.indexOf("---", 2);
  const attrs = parseAttributes(content, match);
  const article = index > -1 ? content.slice(index + 4) : content;

  cache[match.params.name!] = { content: article, attributes: attrs };
  return cache[match.params.name!]!;
};
