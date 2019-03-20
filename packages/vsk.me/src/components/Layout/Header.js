import React from "react"
import classes from "./Header.scss"
import { NavLink } from "react-router-dom"

export default () => (
  <header className={classes.header}>
    <NavLink to="/" activeClassName={classes.active} exact>Home</NavLink>
    <NavLink to="/cv" activeClassName={classes.active}>Curriculum</NavLink>
    <NavLink to="/about" activeClassName={classes.active}>About me</NavLink>
    <NavLink to="/contact" activeClassName={classes.active}>Contact</NavLink>
  </header>
)
