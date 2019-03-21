import React, { PureComponent } from "react";
import SectionHeader from "./SectionHeader";
import SectionText from "./SectionText";
import { Section } from "./CV.styles";
import { Education, Title, Subtitle, EduDate } from "./History.styles";

export default class HistoryEducation extends PureComponent {
  render() {
    return (
      <Section>
        <SectionHeader fa="fa-graduation-cap">Education</SectionHeader>
        <SectionText>
          <Education>
            <Title>SUPSI</Title>
            <Subtitle>
              <i>Computer Science</i>
            </Subtitle>
            <EduDate>2013 - 2014</EduDate>
            <div>
              Studied computer science to get a bachelor degree in my field.
              However, I dropped out once RegioPress decided to finance Corpax.
            </div>
          </Education>
          <Education>
            <Title>Bogazici University</Title>
            <Subtitle>
              <i>Political Science and International Relations</i>
            </Subtitle>
            <EduDate>2007 - 2012</EduDate>
            <div>
              Bogazici is one of the best universities in Turkey. My department
              required to be in the first 700 among 1.5m students in a
              nation-wide exam. I was the 559th.
            </div>
          </Education>
        </SectionText>
      </Section>
    );
  }
}
