import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import context from "../../App.context";
import sk from "@stormkit/api";
import { Container, HireMe, HireMeLink, Hello } from "./Home.styles.js";

class Home extends PureComponent {
  static propTypes = {
    request: PropTypes.object, // Server side request object
    response: PropTypes.object, // Server side response object
  };

  componentDidMount() {
    setTimeout(() => {
      const ref = document.getElementById("hire-me");
      ref && ref.classList.add("trans");
    }, 500);
  }

  render() {
    const { request, response } = this.props;
    const bgType = sk.config(request, response).get("bgType");

    return (
      <Container>
        <Hello bgType={bgType}>
          Hi there,
          <br /> My name is Savas. Currently I'm working at{" "}
          <a
            href="https://www.gitlab.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitLab
          </a>{" "}
          and developing{" "}
          <a
            href="https://www.stormkit.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            stormkit.io
          </a>{" "}
          during my spare time.
          <br />
          Reach out to me from Social Media.
          <br /> Cheers 👋🏻
        </Hello>
        <HireMe id="hire-me">
          <HireMeLink to="/contact">Work with me</HireMeLink>
        </HireMe>
      </Container>
    );
  }
}

export default context.withConsumer(Home);
