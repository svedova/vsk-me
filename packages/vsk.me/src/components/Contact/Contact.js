import React, { Component } from "react"
import classes from "./Contact.scss"
import Base64 from "../../helpers/base64"

export default class Contact extends Component {
  render() {
    const mail = Base64.decode("c2F2YXNAdnNrLm1l")

    return (
      <div className={classes.contact}>
        <div className={classes.desc}>
          <span>You can contact me directly from the following social media channels or drop me an email at: </span>
          <a href={`mailto:${mail}`}>{mail}</a>
        </div>
        <div className={classes.links}>
          <div className={classes.linkedin}>
            <a href="https://www.linkedin.com/in/savas-vedova-1aa66053/" target="_blank">
              <span className="fa fa-linkedin-square"/>
              LinkedIn
            </a>
          </div>
          <div className={classes.facebook}>
            <a href="https://www.facebook.com/savasvedova" target="_blank">
              <span className="fa fa-facebook-square"/>
              Facebook
            </a>
          </div>
          <div className={classes.instagram}>
            <a href="https://www.instagram.com/savasvedova/" target="_blank">
              <span className="fa fa-instagram"/>
              Instagram
            </a>
          </div>
        </div>
      </div>
    )
  }
}

