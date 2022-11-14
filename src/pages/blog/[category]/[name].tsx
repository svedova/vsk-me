import { useMemo } from "react";
import ArrowLongLeftIcon from "@heroicons/react/24/outline/ArrowLongLeftIcon";
import { PathMatch } from "react-router";
import markdown from "markdown-it";
import Layout from "~/components/Layout";
import Logo from "~/components/Logo";
import prism from "markdown-it-prism";
import "prismjs/components/prism-go";
import { useWithContent } from "./_actions";
import Header from "~/components/Layout/Header";
export { useFetchData } from "./_actions";

const md = new markdown({ html: true, linkify: true }).use(prism);

export default ({ match }: { match: PathMatch }) => {
  const { content, attributes } = useWithContent(match);

  const mdContent = useMemo(() => {
    return {
      __html: md.render(content || ""),
    };
  }, [content]);

  if (!content || !attributes) {
    return (
      <Layout className="bg-white">
        <Header />
        <section className="max-w-4xl m-auto mt-4 p-4 bg-gray-50">
          <h2 className="text-center text-2xl">
            Err! Post is not found.
            <a className="block" href="/blog">
              Click to see all posts
            </a>
          </h2>
        </section>
      </Layout>
    );
  }

  return (
    <Layout className="bg-white">
      <Header />
      <section className="max-w-4xl m-auto mt-4 p-4 bg-gray-50">
        <div className="flex items-end justify-end mb-8 w-full">
          <a href="/blog" className="font-bold inline-flex items-center">
            <ArrowLongLeftIcon className="w-5 mr-2" />
            All posts
          </a>
        </div>
        <div className="mb-4 flex items-center border-b border-solid border-gray-200 pb-4">
          <h1 className="text-2xl font-bold mr-4 flex-grow">
            {attributes.title}
          </h1>
          <span
            className={`text-xs font-semibold inline-block py-1 px-2 uppercase hover:opacity-100
                rounded-full text-pink-600 bg-pink-200 last:mr-0 mr-2 cursor-pointer
                border border-pink-600`}
          >
            {attributes.category}
          </span>
          {attributes.date && (
            <div className="text-gray-500 text-sm">
              {new Date(attributes.date).toLocaleDateString("en", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })}
            </div>
          )}
        </div>
        <div dangerouslySetInnerHTML={mdContent} />
      </section>
    </Layout>
  );
};
