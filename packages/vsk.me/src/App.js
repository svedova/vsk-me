/* eslint no-undef: 0 */ // --> OFF
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Helmet from "react-helmet";
import Header from "./components/Layout/Header";
import Styles from "./style/global";
import { Page } from "./App.styles.js";
import routes from "./routes/client";
import context from "./App.context";
import sk from "@stormkit/api";
import StoryblokClient from "storyblok-js-client";

export default class App extends PureComponent {
  static defaultProps = {
    Router: BrowserRouter
  };

  static propTypes = {
    Router: PropTypes.func,
    request: PropTypes.object, // For server side
    response: PropTypes.object // For server side
  };

  constructor(props) {
    super(props);

    // init with access token
    this.Storyblok = new StoryblokClient({
      accessToken: "IcHUfLc2h9ZwvCGTtM9qQgtt",
      cache: {
        clear: "auto",
        type: "memory"
      }
    });
  }

  render() {
    const { Router, request, response } = this.props;
    const bgType = sk.config(request, response).get("bgType");

    return (
      <context.Provider
        value={{ request, response, Storyblok: this.Storyblok }}
      >
        <div className={bgType === "dark" ? "variant-1" : "variant-2"}>
          <Styles variant={bgType} />
          <Helmet>
            <title>Personal Blog | Savas Vedova</title>
            <meta
              name={"description"}
              content={
                "Simple personal home page written in react.js. A bit about me and my projects."
              }
            />
          </Helmet>
          <Router>
            <div>
              <Header />
              <Page>
                <Switch>
                  {routes.map(r => (
                    <Route {...r} key={r.path} />
                  ))}
                  <Route
                    path="*"
                    render={() => (
                      <h1
                        style={{
                          textAlign: "center",
                          margin: "5rem auto 0 auto"
                        }}
                      >
                        Whoops! Nothing found here.
                      </h1>
                    )}
                  />
                </Switch>
              </Page>
            </div>
          </Router>
        </div>
      </context.Provider>
    );
  }
}
