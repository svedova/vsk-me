import React, { PureComponent } from "react"
import SectionHeader from "./SectionHeader"
import SectionText from "./SectionText"
import classes from "./CV.scss"

export default class HistoryLanguages extends PureComponent {
  static langs = {
    "English": 5,
    "Italian": 5,
    "Turkish": 5,
    "French": 3.5,
    "German": 0.5,
  }

  computeClass(stars, i) {
    const ceil = Math.ceil(stars)

    if (i === ceil && ceil !== stars) {
      return "fa fa-star-half-full"
    }

    if (i <= stars) {
      return "fa fa-star"
    }

    return "fa fa-star-o"
  }

  render() {
    const noOfStars = [1, 2, 3, 4, 5]
    const { langs } = HistoryLanguages

    return (
      <div className={classes.section}>
        <SectionHeader fa="fa-asl-interpreting">
          Languages
        </SectionHeader>
        <SectionText>
          {
            Object.keys(langs).map(lang => (
              <div className={classes.lang} key={lang}>
                <div className={classes.langName}>{lang}</div>
                <div className={classes.langStars}>
                  {noOfStars.map(i => <span className={this.computeClass(langs[lang], i)} key={`s-${i}`}/>)}
                </div>
              </div>
            ))
          }
        </SectionText>
      </div>
    )
  }
}
