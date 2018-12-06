import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Route, Switch, StaticRouter, BrowserRouter } from "react-router-dom";
import Header from "./components/Layout/Header";
import Home from "./components/Home";
import CV from "./components/CV";
import About from "./components/About";
import Contact from "./components/Contact";
import "./style/main.scss";
import classes from "./App.scss";
import Helmet from "react-helmet";

export const routes = [
  { path: "/", component: Home, exact: true },
  { path: "/about", component: About, exact: true },
  { path: "/cv", component: CV, exact: true },
  { path: "/contact", component: Contact, exact: true }
];

export default class App extends PureComponent {
  static defaultProps = {
    Router: BrowserRouter
  };

  static propTypes = {
    Router: PropTypes.func
  };

  static renderer = async (context, render) => {
    if (context.route && context.route.setup) {
      await context.route.setup(context);
    }

    const router = props => (
      <StaticRouter
        {...props}
        context={context}
        location={context.request.path}
      />
    );
    const body = render(<App Router={router} />);
    const data = Helmet.renderStatic();
    const head = Object.keys(data).map(k => data[k].toString()).join(""); // prettier-ignore

    return { body, head, headers: {} };
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
