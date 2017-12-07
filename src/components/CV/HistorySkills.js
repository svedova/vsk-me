import React, { PureComponent } from "react"
import SectionHeader from "./SectionHeader"
import SectionText from "./SectionText"
import Skill from "./Skill"
import classes from "./CV.scss"

export default class HistorySkills extends PureComponent {
  static skills = [
    ["React, Redux, Vue, Vuex", 95],
    ["Javascript (ES6, Vanilla)", 95],
    ["Php7", 95],
    ["SQL (PostgreSQL, MySQL)", 90],
    ["Bash", 45],
    ["Node.js", 70],
    ["Python", 55],
  ]

  static frameworks = [
    ["GoLang", 65],
    ["HTML5/CSS3", 95],
    ["Drupal/Wordpress/jQuery", 80],
    ["Bootstrap/Materialize", 70],
    ["Git", 85],
    ["C#", 30],
    ["Java", 45],
  ]

  render() {
    const { skills, frameworks } = HistorySkills

    return (
      <div className={classes.section}>
        <SectionHeader fa="fa-trophy">
          Programming, Tools & Frameworks
        </SectionHeader>
        <SectionText>
          <div className={classes.ps}>
            <div className={classes.psLeft}>
              {skills.map((s, i) => <Skill name={s[0]} perc={s[1]} key={`s-${i}`}/>)}
            </div>
            <div className={classes.psRight}>
              {frameworks.map((s, i) => <Skill name={s[0]} perc={s[1]} key={`f-${i}`}/>)}
            </div>
          </div>
        </SectionText>
      </div>
    )
  }
}