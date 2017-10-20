import React from "react"
import classes from "./Header.scss"
import { Link } from "react-router-dom"

export default () => (
  <header className={classes.header}>
    <Link to="/home">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/cv">CV</Link>
  </header>
)
