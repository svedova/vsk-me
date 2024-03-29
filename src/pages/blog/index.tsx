import { useState, useEffect, useMemo } from "react";
import cn from "classnames";
import { useParams } from "react-router";
import ArrowLongRightIcon from "@heroicons/react/24/outline/ArrowLongRightIcon";
import Layout from "~/components/Layout";
import Header from "~/components/Layout/Header";
import { useWithPosts, Post } from "./_actions";
export { fetchData } from "./_actions";

type BlogParams = {
  category: string;
};

const BlogIndex: React.FC = () => {
  const params = useParams<BlogParams>();
  const allPosts = useWithPosts({ category: params.category! });
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
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mt-2 text-center">
            {categories.map((category) => (
              <span
                key={category}
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
          <div className="px-4 md:px-0 mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search post"
              className="bg-gray-50 p-2 px-4 w-full md:w-80 border border-gray-200 border-solid"
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
      <section className="max-w-4xl mx-4 md:m-auto">
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
                <div className="flex flex-col md:flex-row items-center mt-2">
                  <a href={post.url} className="text-2xl font-bold">
                    {post.attributes.title}
                  </a>

                  {post.category && (
                    <div className="text-xs my-4 md:my-0 font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-100 ml-2">
                      {post.category}
                    </div>
                  )}
                </div>

                {post.attributes.date && (
                  <div className="text-gray-500 text-sm text-center md:text-left">
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
