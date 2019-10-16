import React, { PureComponent } from "react";
import { Container, HireMe, HireMeLink, Hello } from "./Home.styles.js";

export default class Home extends PureComponent {
  componentDidMount() {
    setTimeout(() => {
      const ref = document.getElementById("hire-me");
      ref && ref.classList.add("trans");
    }, 500);
  }

  render() {
    return (
      <Container>
        <Hello>
          Hi there,
          <br /> My name is Savas. Currently I'm working at{" "}
          <a
            href="https://www.tutti.ch"
            target="_blank"
            rel="noopener noreferrer"
          >
            tutti.ch
          </a>{" "}
          at my day job and developing{" "}
          <a
            href="https://www.stormkit.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            stormkit.io
          </a>{" "}
          during my spare time.
          <br />
          Check out my CV or reach me out from Social Media.
          <br /> Cheers 👋🏻
        </Hello>
        <HireMe id="hire-me">
          <HireMeLink to="/contact">Work with me</HireMeLink>
        </HireMe>
      </Container>
    );
  }
}
