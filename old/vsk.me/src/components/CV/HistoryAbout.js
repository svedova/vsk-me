import React, { PureComponent } from "react";
import SectionText from "./SectionText";
import SectionHeader from "./SectionHeader";
import { Section } from "./CV.styles";

export default class HistoryAbout extends PureComponent {
  render() {
    return (
      <Section>
        <SectionHeader fa="fa-user">Summary</SectionHeader>
        <SectionText>
          Being a self-taught passionate programmer, during the recent years I
          have developed an extreme interest into single page apps. Lately, I've
          been experimenting with Golang as well.
          <br />
          <br />
          During my professional career as a programmer, I had to deal with
          complex databases (including setting up), writing backend APIs and
          frontend for several websites.
        </SectionText>
      </Section>
    );
  }
}
