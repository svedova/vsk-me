import React, { PureComponent } from "react";
import me from "../../images/me.png";
import { Wrapper, Me, Name, Img, ImgWrapper } from "./MyProfile.styles";

export default class MyProfile extends PureComponent {
  render() {
    return (
      <Wrapper>
        <ImgWrapper>
          <Img src={me} alt="Savas Vedova" />
        </ImgWrapper>
        <Me>
          <Name>SAVAS VEDOVA</Name>
          <i>Full stack developer</i>
        </Me>
      </Wrapper>
    );
  }
}
