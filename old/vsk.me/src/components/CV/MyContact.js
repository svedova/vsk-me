/* eslint no-undef: 0 */ // --> OFF

import React, { PureComponent } from "react";
import Base64 from "../../helpers/base64";
import { MyContactRow } from "./MyContact.styles";

export default class MyContact extends PureComponent {
  static FB_LINK = "https://www.facebook.com/savasvedova";
  static IG_LINK = "https://www.instagram.com/savasvedova";
  static IN_LINK = "https://www.linkedin.com/in/savas-vedova";
  static TW_LINK = "https://www.twitter.com/savasvedova";

  render() {
    const mail = Base64.decode("c2F2YXNAdnNrLm1l");

    return (
      <div>
        <MyContactRow>
          <a href="https://vsk.me">
            <span className="fa fa-globe" />
            <span>https://vsk.me</span>
          </a>
        </MyContactRow>
        <MyContactRow>
          <a href="https://vsk.me">
            <span className="fa fa-phone" />
            <span>+41.78.863.05.10</span>
          </a>
        </MyContactRow>
        <MyContactRow>
          <a href={`mailto:${mail}`}>
            <span className="fa fa-envelope" />
            <span>{mail}</span>
          </a>
        </MyContactRow>
        <MyContactRow>
          <span className="fa fa-map-pin" />
          <span>Zurich, Switzerland</span>
        </MyContactRow>
        <MyContactRow>
          <a href={MyContact.FB_LINK}>
            <span className="fa fa-facebook" />
            <span>facebook.com/savasvedova</span>
          </a>
        </MyContactRow>
        <MyContactRow>
          <a href={MyContact.IG_LINK}>
            <span className="fa fa-instagram" />
            <span>instagram.com/savasvedova</span>
          </a>
        </MyContactRow>
        <MyContactRow>
          <a href={MyContact.IN_LINK}>
            <span className="fa fa-linkedin" />
            <span>linkedin.com/in/savas-vedova</span>
          </a>
        </MyContactRow>
        <MyContactRow>
          <a href={MyContact.TW_LINK}>
            <span className="fa fa-twitter" />
            <span>twitter.com/savasvedova</span>
          </a>
        </MyContactRow>
      </div>
    );
  }
}
