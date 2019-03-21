/* eslint no-undef: 0 */ // --> OFF
import React, { PureComponent } from "react";
import SectionHeader from "./SectionHeader";
import SectionText from "./SectionText";
import { Lang, Name, Stars } from "./HistoryLanguage.styles";
import { Section } from "./CV.styles";

export default class HistoryLanguages extends PureComponent {
  static langs = {
    English: 5,
    Italian: 5,
    Turkish: 5,
    French: 3.5,
    German: 0.5
  };

  computeClass(stars, i) {
    const ceil = Math.ceil(stars);

    if (i === ceil && ceil !== stars) {
      return "fa fa-star-half-full";
    }

    if (i <= stars) {
      return "fa fa-star";
    }

    return "fa fa-star-o";
  }

  render() {
    const noOfStars = [1, 2, 3, 4, 5];
    const { langs } = HistoryLanguages;

    return (
      <Section>
        <SectionHeader fa="fa-asl-interpreting">Languages</SectionHeader>
        <SectionText>
          {Object.keys(langs).map(lang => (
            <Lang key={lang}>
              <Name>{lang}</Name>
              <Stars>
                {noOfStars.map(i => (
                  <span
                    className={this.computeClass(langs[lang], i)}
                    key={`s-${i}`}
                  />
                ))}
              </Stars>
            </Lang>
          ))}
        </SectionText>
      </Section>
    );
  }
}
