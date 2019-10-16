/* eslint no-undef: 0 */ // --> OFF
import React, { PureComponent } from "react";
import { Experience, Title, Period, Body } from "./HistoryExperience.styles";
import SectionHeader from "./SectionHeader";
import SectionText from "./SectionText";
import { Section } from "./CV.styles";

export default class HistrorySideProjects extends PureComponent {
  render() {
    return (
      <Section>
        <SectionHeader fa="fa-code-fork">Side Projects</SectionHeader>
        <SectionText>
          <Experience>
            <div>
              <Title>Stormkit, Founder</Title>
              <Period>
                <i>2018 August - Present</i>
              </Period>
            </div>
            <Body>
              <span>
                As a fun project, I developed a platform to simplify the life of
                frontend developers. With a few clicks, it connects to your
                favorite provider, deploys your application and provides
                features around staged rollouts, remote configuration and a/b
                testing. The applications hosted on Stormkit are fully
                serverless, with autoscaling and auto-tls certificates managed
                by the tool itself.
                <ul>
                  <li>The API and the load balancer is written in Golang.</li>
                  <li>The deployment servers are written in Node.js</li>
                  <li>
                    Landing page developed with Gatsby.js, and the console in
                    React.
                  </li>
                  <li>The infrastructure is hosted on AWS.</li>
                  <li>
                    You can visit the website on{" "}
                    <a
                      href="https://www.stormkit.io"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      www.stormkit.io
                    </a>
                  </li>
                </ul>
              </span>
            </Body>
          </Experience>
        </SectionText>
      </Section>
    );
  }
}
