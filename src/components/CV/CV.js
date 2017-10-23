import React, { Component } from "react"
import { sticky, unsticky } from "sticky-content"
import MyProfile from "./MyProfile"
import MyContact from "./MyContact"
import HistoryAbout from "./HistoryAbout"
import HistoryExperiences from "./HistoryExperiences"
import HistoryEducation from "./HistoryEducation"
import HistorySkills from "./HistorySkills"
import HistoryLanguages from "./HistoryLanguages"
import classes from "./CV.scss"
import CloudFlash from "cloudflash.io-client"

export default class CV extends Component {

  componentDidMount() {
    const root = document.querySelector(`.${classes.stickyContent}`)
    root && sticky(root)
    CloudFlash.persist()
  }

  componentWillUnmount() {
    const root = document.querySelector(`.${classes.stickyContent}`)
    root && unsticky(root)
  }

  render() {
    return (
      <div className={classes.cv}>
        <div className={classes.myDetails}>
          <div className={classes.stickyContent}>
            <MyProfile/>
            <MyContact/>
          </div>
        </div>
        <div className={classes.myHistory}>
          <HistoryAbout/>
          <HistoryExperiences/>
          <HistoryEducation/>
          <HistorySkills/>
          <HistoryLanguages/>
        </div>
      </div>
    )
  }
}
