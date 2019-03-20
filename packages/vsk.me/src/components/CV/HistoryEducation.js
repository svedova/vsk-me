import React, { PureComponent } from "react";
import SectionHeader from "./SectionHeader";
import SectionText from "./SectionText";
import classes from "./CV.scss";

export default class HistoryEducation extends PureComponent {
  render() {
    return (
      <div className={classes.section}>
        <SectionHeader fa="fa-graduation-cap">Education</SectionHeader>
        <SectionText>
          <div className={classes.education}>
            <h3 className={classes.educationTitle}>SUPSI</h3>
            <h4 className={classes.educationSubTitle}>
              <i>Computer Science</i>
            </h4>
            <div className={classes.educationDate}>2013 - 2014</div>
            <div className={classes.educationDescription}>
              Studied computer science to get a bachelor degree in my field.
              However, I dropped out once RegioPress decided to finance Corpax.
            </div>
          </div>
          <div className={classes.education}>
            <h3 className={classes.educationTitle}>Bogazici University</h3>
            <h4 className={classes.educationSubTitle}>
              <i>Political Science and International Relations</i>
            </h4>
            <div className={classes.educationDate}>2007 - 2012</div>
            <div className={classes.educationDescription}>
              Bogazici is one of the best universities in Turkey. My department
              required to be in the first 700 among 1.5m students in a
              nation-wide exam. I was the 559th.
            </div>
          </div>
        </SectionText>
      </div>
    );
  }
}
