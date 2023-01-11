import type { OG } from "~/entry-server";
import { useContext, useEffect, useState } from "react";
import Context from "~/context";

const files = import.meta.glob("/src/content/**/*.md", { as: "raw" });

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

interface UseWithContentProps {
  title: string;
  category: string;
}

export const useWithContent = ({
  title,
  category,
}: UseWithContentProps): WithContentReturnValue => {
  const { data: cached } = useContext(Context);
  const [attributes, setAttributes] = useState<Attributes>(cached?.attributes);
  const [content, setContent] = useState<string>(cached?.content);

  useEffect(() => {
    fetchData({ title, category }).then(({ context }) => {
      if (context?.content) {
        setAttributes(context.attributes);
        setContent(context.content);
      }
    });
  }, []);

  return { content, attributes };
};

export const parseAttributes = (
  content: string,
  category?: string
): Attributes => {
  const attrs: Attributes = {};
  const index = content.indexOf("---", 2);

  if (index > -1) {
    content
      .slice(3, index)
      .split(/\n/g)
      .filter((i) => i)
      .forEach((str) => {
        const [key, ...value] = str.split(":");
        attrs[key.toLowerCase() as keyof Attributes] = value.join(":").trim();
      });
  }

  attrs.category = category;
  return attrs;
};

interface FetchDataProps {
  category: string;
  title: string;
}

// Fetch blog post
export const fetchData = async ({
  category,
  title,
}: FetchDataProps): Promise<{
  context: WithContentReturnValue | void;
  head: OG;
}> => {
  const file = files[`/src/content/${category}/${title}.md`];

  if (!file) {
    return { context: undefined, head: {} };
  }

  const content = await file();
  const index = content.indexOf("---", 2);
  const attrs = parseAttributes(content, category);
  const article = index > -1 ? content.slice(index + 4) : content;

  return {
    context: { content: article, attributes: attrs },
    head: { title: attrs.title, description: attrs.description },
  };
};
