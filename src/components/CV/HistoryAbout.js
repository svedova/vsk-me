import React, { PureComponent } from "react"
import SectionText from "./SectionText"
import SectionHeader from "./SectionHeader"
import classes from "./CV.scss"

export default class HistoryAbout extends PureComponent {
  render() {
    return (
      <div className={classes.section}>
        <SectionHeader fa="fa-user">About me</SectionHeader>
        <SectionText>
          Hello there! I am a self-taught web developer. My elder brother who was a developer back then showed me some
          cool
          web pages he created when I was only 12 years old, and since then I developed a passion for programming
          languages.
          I am 28 but I remember the old days where we had to write javascript to animate simple dropdown lists, and we
          used html tables for layouts. I consider myself a very fast learner. I have a huge interest in learning new
          stuff,
          keeping myself updated and building personal wisdom. I am very ambitious, positive, easygoing and calm.
          I like doing sports a lot. Stay fit and be happy. That is what I believe. I used to play soccer some years
          ago.
          However, right now, I only go to run and swim.
          Last but not least, I am very obsessed with writing clean code. I try to make everything readable and
          consistent.
          I do like writing doc-blocks to document the functions.
        </SectionText>
      </div>
    )
  }
}
