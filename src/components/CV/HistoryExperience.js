import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import classes from "./CV.scss"

export default class HistoryExperience extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string, // The title of the experience
    period: PropTypes.string // The period
  }

  render() {
    const { children, title, period } = this.props

    return (
      <div className={classes.experience}>
        <div className={classes.experienceHeader}>
          <h3 className={classes.experienceTitle}>
            {title}
          </h3>
          <div className={classes.experiencePeriod}>
            <i>
              {period}
            </i>
          </div>
        </div>
        <div className={classes.experienceBody}>
          {children}
        </div>
      </div>
    )
  }
}