import React, { PureComponent } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import Header from "./components/Layout/Header"
import Home from "./components/Home"
import CV from "./components/CV"
import About from "./components/About"

import "./style/main.scss"
import classes from "./App.scss"

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <div className={classes.wrapper}>
          <Header/>
          <div className={classes.page}>
            <Route path="/" component={Home} exact/>
            <Route path="/about" component={About} exact/>
            <Route path="/cv" component={CV} exact/>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
