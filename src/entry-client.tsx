/// <reference types="webpack-env" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import Loadable from "react-loadable";
import App from "./App";

// 准备预加载
(window as any).hydrate = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(<App />, document.getElementById("app"));
  });
}

// 热更新
if (module.hot) {
  module.hot.accept("./App", () => {
    const NewApp = require("./App").default;
    ReactDOM.hydrate(<NewApp />, document.getElementById("app"));
  });
}
