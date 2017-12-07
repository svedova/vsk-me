import React, { PureComponent } from "react"
import Base64 from "../../helpers/base64"
import classes from "./CV.scss"

export default class MyContact extends PureComponent {
  static FB_LINK = "https://www.facebook.com/savasvedova"
  static IG_LINK = "https://www.instagram.com/savasvedova"

  render() {
    const mail = Base64.decode("c2F2YXNAdnNrLm1l")

    return (
      <div className={classes.myContact}>
        <div className={classes.myContactRow}>
          <a href="https://vsk.me">
            <span className="fa fa-globe"/>
            <span>https://vsk.me</span>
          </a>
        </div>
        <div className={classes.myContactRow}>
          <a href="`mailto:${mail}`">
            <span className="fa fa-envelope"/>
            <span>{mail}</span>
          </a>
        </div>
        <div className={classes.myContactRow}>
          <span className="fa fa-map-pin"/>
          <span>Zurich, Switzerland</span>
        </div>
        <div className={classes.myContactRow}>
          <a href={MyContact.FB_LINK}>
            <span className="fa fa-facebook"/>
            <span>Facebook</span>
          </a>
        </div>
        <div className={classes.myContactRow}>
          <a href={MyContact.IG_LINK}>
            <span className="fa fa-instagram"/>
            <span>Instagram</span>
          </a>
        </div>
      </div>
    )
  }
}
