import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const func = typeof window.__INITIAL_STATE__ !== "undefined" ? "hydrate" : "render";
ReactDOM[func](App(), document.getElementById("root"));
