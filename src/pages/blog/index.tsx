import type { PathMatch } from "react-router";
import { useState, useEffect, useMemo } from "react";
import cn from "classnames";
import ArrowLongRightIcon from "@heroicons/react/24/outline/ArrowLongRightIcon";
import Layout from "~/components/Layout";
import Header from "~/components/Layout/Header";
import { useWithPosts, Post } from "./_actions";
export { useFetchData } from "./_actions";

interface Props {
  match: PathMatch;
}

const BlogIndex: React.FC<Props> = ({ match }) => {
  const allPosts = useWithPosts(match);
  const [posts, setPosts] = useState<Post[]>(allPosts);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = useMemo(() => {
    return [...new Set(allPosts.map((p) => p.category).filter((i) => i))];
  }, [allPosts]);

  useEffect(() => {
    setPosts(allPosts);
  }, [allPosts]);

  const handleToggleCategory = (category: string) => {
    return () => {
      const index = selectedCategories.indexOf(category);
      let newArr: string[];

      if (index > -1) {
        newArr = [...selectedCategories];
        newArr.splice(index, 1);
      } else {
        newArr = [...selectedCategories, category];
      }

      setSelectedCategories(newArr);

      if (newArr.length === 0) {
        setPosts(allPosts);
      } else {
        setPosts(
          allPosts.filter((p) => p.category && newArr.indexOf(p.category) > -1)
        );
      }
    };
  };

  if (posts?.length === 0) {
    return (
      <Layout className="bg-white">
        <Header />
        <section className="max-w-4xl m-auto">
          <h2 className="text-2xl">
            Nothing here yet. Stay tuned for updates.
          </h2>
        </section>
      </Layout>
    );
  }

  return (
    <Layout className="bg-white">
      <Header />
      <section className="max-w-4xl m-auto">
        <div className="flex justify-between">
          <div className="mt-2 text-center">
            {categories.map((category) => (
              <span
                className={cn(
                  `text-xs font-semibold inline-block py-3 px-6 uppercase hover:opacity-100
                rounded-full text-pink-600 bg-pink-200 last:mr-0 mr-2 cursor-pointer
                border border-pink-600`,
                  {
                    "opacity-50 border-transparent":
                      selectedCategories.indexOf(category!) === -1,
                  }
                )}
                onClick={handleToggleCategory(category!)}
              >
                {category}
              </span>
            ))}
          </div>
          <div>
            <input
              type="text"
              placeholder="Search post"
              className="bg-gray-50 p-2 px-4 w-80 border border-gray-200 border-solid"
              onKeyUp={(e) => {
                const target = e.target as HTMLInputElement;

                if (target.value === "") {
                  setPosts(allPosts);
                } else {
                  setPosts(
                    allPosts.filter(
                      (p) =>
                        p.name
                          .toLowerCase()
                          .indexOf(target.value.toLowerCase()) > -1
                    )
                  );
                }
              }}
            />
          </div>
        </div>
      </section>
      <section className="max-w-4xl m-auto">
        <div className="mt-4">
          {posts.map((post) => (
            <div
              key={post.url}
              role="button"
              className="flex items-center mb-2 bg-gray-50 rounded py-16 px-6 hover:border-violet-300 border border-solid border-gray-200"
              tabIndex={0}
              onClick={() => {
                window.location.assign(post.url);
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  window.location.assign(post.url);
                }
              }}
            >
              <div className="flex-grow">
                <div className="flex items-center mt-2">
                  <a href={post.url} className="capitalize text-2xl font-bold">
                    {post.name}
                  </a>

                  {post.category && (
                    <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-100 ml-2">
                      {post.category}
                    </div>
                  )}
                </div>

                {post.attributes.date && (
                  <div className="text-gray-500 text-sm">
                    {new Date(post.attributes.date).toLocaleDateString("en", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })}
                  </div>
                )}
              </div>
              <ArrowLongRightIcon className="w-8 text-violet-500" />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default BlogIndex;
