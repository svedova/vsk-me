import React from "react";
import cn from "classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<Props> = ({ children, className }) => {
  return (
    <main className={cn("min-h-screen md:px-4 lg:px-0", className)}>
      {children}
    </main>
  );
};

export default Layout;
