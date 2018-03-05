import React, { PureComponent } from "react";
import SectionHeader from "./SectionHeader";
import SectionText from "./SectionText";
import Skill from "./Skill";
import classes from "./CV.scss";

export default class HistorySkills extends PureComponent {
  static skills = [
    ["React, Redux, Vue, Vuex", 95],
    ["Javascript (ES6, Vanilla)", 95],
    ["HTML5/CSS3", 95],
    ["Node.js", 85],
    ["GoLang", 65],
    ["AWS (Lambda, EC2, API GW, Route53, S3)"]
  ];

  static frameworks = [
    ["Python", 55],
    ["Php7", 95],
    ["Bash", 45],
    ["Git", 85],
    ["Docker", 60],
    ["CI/CD (Jenkins, CircleCI)", 80]
  ];

  render() {
    const { skills, frameworks } = HistorySkills;

    return (
      <div className={classes.section}>
        <SectionHeader fa="fa-trophy">
          Programming, Tools & Frameworks
        </SectionHeader>
        <SectionText>
          <div className={classes.ps}>
            <div className={classes.psLeft}>
              {skills.map((s, i) => (
                <Skill name={s[0]} perc={s[1]} key={`s-${i}`} />
              ))}
            </div>
            <div className={classes.psRight}>
              {frameworks.map((s, i) => (
                <Skill name={s[0]} perc={s[1]} key={`f-${i}`} />
              ))}
            </div>
          </div>
        </SectionText>
      </div>
    );
  }
}
