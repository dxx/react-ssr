import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.hydrate(<App />, document.getElementById("app"));

// 热更新
if (module.hot) {
  module.hot.accept("./App.jsx", () => {
    const NewApp = require("./App").default;
    ReactDOM.hydrate(<NewApp />, document.getElementById("app"));
  });
}
