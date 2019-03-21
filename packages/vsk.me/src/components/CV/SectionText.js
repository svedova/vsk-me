/* eslint no-undef: 0 */ // --> OFF
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class SectionText extends PureComponent {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const { children } = this.props;

    return <div>{children}</div>;
  }
}
