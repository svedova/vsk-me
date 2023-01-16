import ArrowLongRightIcon from "@heroicons/react/24/outline/ArrowLongRightIcon";
import Layout from "../components/Layout";
import avatar from "../assets/avatar.png";

interface CardProps {
  href: string;
  title: string;
  subtitle?: string;
  target?: string;
}

const Card: React.FC<CardProps> = ({ title, subtitle, href, target }) => (
  <a
    href={href}
    target={target}
    rel={target === "_blank" ? "noopener noreferrer" : ""}
    className="flex items-center bg-white rounded-sm p-4 mr-4 text-black hover:text-violet-500 mb-4 text:border-violet-300 border-violet-200 border border-solid"
  >
    <span className="flex-grow text-left">
      <strong className="font-bold block">{title}</strong>
      <span>{subtitle}</span>
    </span>
    <span className="flex justify-center">
      <ArrowLongRightIcon className="h-6 w-6" />
    </span>
  </a>
);

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center w-full min-h-screen justify-center">
        <div className="rounded-full overflow-hidden inline-block w-40 h-40">
          <img src={avatar} alt="Savas Vedova profile picture" />
        </div>
        <h1 className="mt-8 mb-4 md:mb-0">Hi 👋</h1>
        <h2 className="mb-8 text-center px-4 md:px-0">
          My name is Savas. I am software engineer working at GitLab. <br />I
          also tweet and blog about tech and startups.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-xl pl-4 md:pl-0">
          <Card href="/blog" title="Read my blog" />
          <Card
            href="https://twitter.com/savasvedova"
            title="Connect on Twitter"
            target="_blank"
          />
          <Card
            href="https://www.linkedin.com/in/savas-vedova/"
            title="Connect on LinkedIn"
            target="_blank"
          />
          <Card
            href="mailto:savas@vsk.me"
            title="Send me an email"
            target="_blank"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
