import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Header from "./components/Layout/Header";
import "./style/main.scss";
import classes from "./App.scss";
import routes from "./routes/client";

export default class App extends PureComponent {
  static defaultProps = {
    Router: BrowserRouter
  };

  static propTypes = {
    Router: PropTypes.func
  };

  render() {
    const { Router } = this.props;

    return (
      <Router>
        <div className={classes.wrapper}>
          <Header />
          <div className={classes.page}>
            <Switch>
              {routes.map(r => (
                <Route {...r} key={r.path} />
              ))}
              <Route
                path="*"
                render={() => (
                  <h1
                    style={{ textAlign: "center", margin: "5rem auto 0 auto" }}
                  >
                    Whoops! Nothing found here.
                  </h1>
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
