import React, { Component } from "react";
import { sticky, unsticky } from "sticky-content";
import MyProfile from "./MyProfile";
import MyContact from "./MyContact";
import HistoryAbout from "./HistoryAbout";
import HistoryExperiences from "./HistoryExperiences";
import HistoryEducation from "./HistoryEducation";
import HistorySkills from "./HistorySkills";
import HistoryLanguages from "./HistoryLanguages";
import classes from "./CV.scss";

export default class CV extends Component {
  componentDidMount() {
    this.root = document.querySelector(`.${classes.stickyContent}`);
    this.root && sticky(this.root);
  }

  componentWillUnmount() {
    this.root && unsticky(this.root);
  }

  render() {
    return (
      <div className={classes.cv}>
        <div className={classes.myDetails}>
          <div className={classes.stickyContent}>
            <MyProfile />
            <MyContact />
          </div>
        </div>
        <div className={classes.myHistory}>
          <HistoryAbout />
          <HistoryExperiences />
          <HistoryEducation />
          <HistorySkills />
          <HistoryLanguages />
        </div>
      </div>
    );
  }
}
