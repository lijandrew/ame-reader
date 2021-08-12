import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";

import "./index.scss";

ReactDOM.render(<App />, document.querySelector("#root"));

module.hot.accept();
