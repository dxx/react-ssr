import React from "react";
import ReactDOM from "react-dom";
import { loadComponents } from "loadable-components";
import App from "./App";

// 开始渲染之前加载所需的组件
loadComponents().then(() => {
  ReactDOM.hydrate(<App />, document.getElementById("app"));
});

// 热更新
if (module.hot) {
  module.hot.accept("./App.jsx", () => {
    const NewApp = require("./App").default;
    ReactDOM.hydrate(<NewApp />, document.getElementById("app"));
  });
}
