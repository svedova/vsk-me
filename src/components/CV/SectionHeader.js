import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import classes from "./CV.scss"

export default class SectionHeader extends PureComponent {
  static propTypes = {
    fa: PropTypes.string.isRequired, // The className for fa
    children: PropTypes.node,
  }

  render() {
    const { fa, children } = this.props

    return (
      <h2 className={classes.sectionHeader}>
        <span className={`fa ${fa}`}/>
        <span className={classes.sectionHeaderText}>{children}</span>
      </h2>
    )
  }
}