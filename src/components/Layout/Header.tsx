import TwitterLogo from "~/assets/twitter.svg";
import Logo from "../Logo";

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <header className="border-b border-solid border-gray-200 mb-4">
      <nav className="max-w-4xl m-auto bg-white flex items-center justify-between py-4">
        <Logo />
        <div>
          <a
            href="https://www.twitter.com/savasvedova"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
          >
            <img
              src={TwitterLogo}
              alt="Savas Vedova on Twitter"
              className="w-8 inline-block mr-2"
            />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
