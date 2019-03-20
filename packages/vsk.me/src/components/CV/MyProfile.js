import React, { PureComponent } from "react";
import classes from "./CV.scss";
import me from "../../images/me.png";

export default class MyProfile extends PureComponent {
  render() {
    return (
      <div className={classes.myProfile}>
        <div className={classes.myProfilePic}>
          <img
            className={classes.myProfilePicImg}
            src={me}
            alt="Savas Vedova"
          />
        </div>
        <div className={classes.my}>
          <h1 className={classes.myName}>SAVAS VEDOVA</h1>
          <i className={classes.myJobTitle}>Full stack developer</i>
        </div>
      </div>
    );
  }
}
