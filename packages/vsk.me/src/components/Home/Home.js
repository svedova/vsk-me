import React, { PureComponent } from "react";
import { Container, HireMe, HireMeLink } from "./Home.styles.js";

export default class Home extends PureComponent {
  componentDidMount() {
    setTimeout(() => {
      this.refs["hire-me"].classList.add("trans");
    }, 500);
  }

  render() {
    return (
      <Container>
        <HireMe ref="hire-me">
          <HireMeLink to="/contact">Work with me</HireMeLink>
        </HireMe>
      </Container>
    );
  }
}
