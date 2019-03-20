import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classes from "./CV.scss";

export default class Skill extends PureComponent {
  static propTypes = {
    name: PropTypes.string, // The skill name
    perc: PropTypes.number // The skill percentage
  };

  render() {
    const { name, perc } = this.props;

    return (
      <div className={classes.skillBar}>
        <div className={classes.skillBarBg} style={{ width: perc + "%" }}>
          {name}
        </div>
      </div>
    );
  }
}
