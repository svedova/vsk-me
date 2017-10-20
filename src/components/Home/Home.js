import React, { PureComponent } from "react"
import { Link } from "react-router-dom"
import classes from "./Home.scss"

export default class Home extends PureComponent {

  componentDidMount() {
    setTimeout(() => {
      this.refs["hire-me"].classList.add(classes.trans)
    }, 500)
  }

  render() {
    return (
      <div className={classes.container}>
        <h1 className={classes.hireMe} ref="hire-me">
          <Link to="/contact" className={classes.hireMeA}>
            Work with me
          </Link>
        </h1>
      </div>
    )
  }
}
