import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, StaticRouter, Route, Switch } from "react-router-dom";
import { RouterConfig } from "stormkit-io";
import Header from "./components/Layout/Header";
import Home from "./components/Home";
import CV from "./components/CV";
import About from "./components/About";
import Contact from "./components/Contact";
import "./style/main.scss";
import classes from "./App.scss";

const routes = RouterConfig([
  { path: "/", component: Home, exact: true },
  { path: "/about", component: About, exact: true },
  { path: "/cv", component: CV, exact: true },
  { path: "/contact", component: Contact, exact: true }
]);

class App extends PureComponent {
  static propTypes = {
    Router: PropTypes.func
  };

  render() {
    return (
      <BrowserRouter>
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
      </BrowserRouter>
    );
  }
}

/**
 *
 * @param {*|=} context
 * @param {*|=} location
 * @return {*}
 */
export default ({ context, location } = {}) => {
  // Define the Router
  const Router =
    typeof window === "undefined"
      ? props => (
          <StaticRouter {...props} context={context} location={location} />
        )
      : BrowserRouter;

  return <App Router={Router} />;
};
