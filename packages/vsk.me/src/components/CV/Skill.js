/* eslint no-undef: 0 */ // --> OFF
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { SkillBar, SkillBarBG } from "./Skill.styles";

export default class Skill extends PureComponent {
  static propTypes = {
    name: PropTypes.string, // The skill name
    perc: PropTypes.number // The skill percentage
  };

  render() {
    const { name, perc } = this.props;

    return (
      <SkillBar>
        <SkillBarBG width={perc + "%"}>{name}</SkillBarBG>
      </SkillBar>
    );
  }
}
