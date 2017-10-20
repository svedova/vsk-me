import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import classes from "./CV.scss"

export default class SectionText extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props

    return (
      <div className={classes.sectionText}>
        {children}
      </div>
    )
  }
}
