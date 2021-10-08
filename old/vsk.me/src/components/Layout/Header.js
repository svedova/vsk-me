import React from "react";
import { NavLink } from "react-router-dom";
import { Header } from "./Header.styles";

export default () => (
  <Header>
    <NavLink to="/" activeClassName={"active"} exact>
      Home
    </NavLink>
    <NavLink to="/blog" activeClassName={"active"}>
      Blog
    </NavLink>
    <NavLink to="/cv" activeClassName={"active"}>
      Curriculum
    </NavLink>
    <NavLink to="/about" activeClassName={"active"}>
      About me
    </NavLink>
    <NavLink to="/contact" activeClassName={"active"}>
      Contact
    </NavLink>
  </Header>
);
