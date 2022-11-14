import React from "react";
import ReactDOM from "react-dom/client";
import currentRoute from "./router";
import "./index.css";

async function createRoot() {
  const route = await currentRoute(window.location.pathname);

  ReactDOM.hydrateRoot(
    document.getElementById("root") as HTMLElement,
    <React.StrictMode>
      {route ? <route.App match={route.match} /> : <div>Page is not found</div>}
    </React.StrictMode>
  );
}

(async () => {
  await createRoot();
})();
