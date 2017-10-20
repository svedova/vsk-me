import React from "react"
import classes from "./Header.scss"
import { Link } from "react-router-dom"

export default () => (
  <header className={classes.header}>
    <Link to="/">Home</Link>
    <Link to="/cv">Curriculum</Link>
    <Link to="/about">About me</Link>
    <Link to="/contact">Contact</Link>
  </header>
)
