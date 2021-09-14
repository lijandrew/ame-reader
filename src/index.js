import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";

import "./index.scss";

ReactDOM.render(<App />, document.querySelector("#root"));

/*
if ("serviceworker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}
*/
