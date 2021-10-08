/* eslint no-undef: 0 */ // --> OFF
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Experience, Title, Period, Body } from "./HistoryExperience.styles";

export default class HistoryExperience extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string, // The title of the experience
    period: PropTypes.string // The period
  };

  render() {
    const { children, title, period } = this.props;

    return (
      <Experience>
        <div>
          <Title>{title}</Title>
          <Period>
            <i>{period}</i>
          </Period>
        </div>
        <Body>{children}</Body>
      </Experience>
    );
  }
}
