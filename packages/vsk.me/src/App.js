/* eslint no-undef: 0 */ // --> OFF
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Helmet from "react-helmet";
import Header from "./components/Layout/Header";
import Styles from "./style/global";
import { Page } from "./App.styles.js";
import routes from "./routes/client";
import sk from "@stormkit/api";

export default class App extends PureComponent {
  static defaultProps = {
    Router: BrowserRouter
  };

  static propTypes = {
    Router: PropTypes.func,
    request: PropTypes.object // For server side
  };

  constructor(props) {
    super(props);
    this.config = sk.config(props.request);
    sk.log("debug", this.config);
    sk.log("debug", props.request.header("cookie"));
  }

  render() {
    const { Router } = this.props;

    return (
      <React.Fragment>
        <div style={{ display: "none" }}>{JSON.stringify(this.config)}</div>
        <Styles />
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
      </React.Fragment>
    );
  }
}
