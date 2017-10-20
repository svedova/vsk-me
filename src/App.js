import React, { Component } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import classes from "./App.scss"
import Header from "./components/Layout/Header"
import Home from "./components/Home"

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className={classes.App}>
          <Header/>
          <Route path="/" component={Home}/>
          <Route path="/about" component={Home}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
