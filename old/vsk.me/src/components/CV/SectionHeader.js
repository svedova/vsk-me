/* eslint no-undef: 0 */ // --> OFF
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { SectionH2, SectionHeaderText } from "./CV.styles";

export default class SectionHeader extends PureComponent {
  static propTypes = {
    fa: PropTypes.string.isRequired, // The className for fa
    children: PropTypes.node
  };

  render() {
    const { fa, children } = this.props;

    return (
      <SectionH2>
        <span className={`fa ${fa}`} />
        <SectionHeaderText>{children}</SectionHeaderText>
      </SectionH2>
    );
  }
}
