import { useMemo } from "react";
import ArrowLongLeftIcon from "@heroicons/react/24/outline/ArrowLongLeftIcon";
import { useParams } from "react-router";
import markdown from "markdown-it";
import Layout from "~/components/Layout";
import prism from "markdown-it-prism";
import "prismjs/components/prism-go";
import "prismjs/components/prism-diff";
import { useWithContent } from "./_actions";
import Header from "~/components/Layout/Header";
export { fetchData } from "./_actions";

const md = new markdown({ html: true, linkify: true }).use(prism);

const Post: React.FC = () => {
  const params = useParams();
  const { content, attributes } = useWithContent({
    title: params.title!,
    category: params.category!,
  });

  const mdContent = useMemo(() => {
    return {
      __html:
        // We get the content directly from the server side rendered content because
        // md.render does not behave the same server-side and client-side.
        (typeof document !== "undefined" &&
          document.querySelector("#blog-content")?.innerHTML) ||
        md.render(content || ""),
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
      <section className="max-w-4xl m-auto mt-4 p-16 bg-gray-50">
        <div className="flex items-center">
          <div className="flex flex-1 items-center">
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
          <a href="/blog" className="font-bold inline-flex items-center">
            <ArrowLongLeftIcon className="w-5 mr-2" />
            All posts
          </a>
        </div>
        <h1 className="text-4xl font-bold mr-4 my-24 pb-2 text-center">
          {attributes.title}
        </h1>
        <div id="blog-content" dangerouslySetInnerHTML={mdContent} />
      </section>
    </Layout>
  );
};

export default Post;
