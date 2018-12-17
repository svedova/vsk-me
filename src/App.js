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
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
