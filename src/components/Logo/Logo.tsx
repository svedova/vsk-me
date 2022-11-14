import React from "react";
import logo from "~/assets/avatar.png";

const Logo: React.FC = () => {
  return (
    <a href="/" className="inline-flex items-center">
      <img src={logo} alt="vsk.me logo" className="w-8 h-8 rounded-full mr-2" />
      <span className="text-gray-500 font-bold">Savas Vedova</span>
    </a>
  );
};

export default Logo;
