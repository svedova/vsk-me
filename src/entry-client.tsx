import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import createRoutes from "./router";
import App from "./App";
import Context from "./context";
import "./index.css";

declare global {
  interface Window {
    CONTEXT: any;
  }
}

async function createRoot() {
  const { routes } = await createRoutes(window.location.pathname);
  let data = window.CONTEXT;

  ReactDOM.hydrateRoot(
    document.getElementById("root") as HTMLElement,
    <React.StrictMode>
      <Context.Provider value={{ data }}>
        <BrowserRouter>
          <App routes={routes} />
        </BrowserRouter>
      </Context.Provider>
    </React.StrictMode>
  );
}

(async () => {
  await createRoot();
})();
