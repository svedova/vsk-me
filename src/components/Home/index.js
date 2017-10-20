import React, { PureComponent } from "react"
import classes from "./Home.scss"

export default class Home extends PureComponent {

  componentDidMount () {
    setTimeout(() => {
      this.refs['hire-me'].classList.add(classes.trans)
    }, 500)
  }

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.hireMe} ref="hire-me">
          <a href="#" className={classes.hireMeA}>Work with me</a>
        </div>
      </div>
    )
  }
}
