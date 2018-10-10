const express = require("express");
const fs = require("fs");
const path = require("path");
const ReactDOMServer = require("react-dom/server");
const app = express();

const isProd = process.env.NODE_ENV === "production";

let serverEntry;
let template;
let readyPromise;
if (isProd) {
  serverEntry = require("../dist/entry-server");
  template = fs.readFileSync("./dist/index.html", "utf-8");
  // 静态资源映射到dist路径下
  app.use("/dist", express.static(path.join(__dirname, "../dist")));
} else {
  readyPromise = require("./setup-dev-server")(app, (entry, htmlTemplate) => {
    serverEntry = entry;
    template = htmlTemplate;
  });
}


app.use("/public", express.static(path.join(__dirname, "../public")));

/* eslint-disable no-console */
const render = (req, res) => {
  console.log("======enter server======");
  console.log("visit url: " + req.url);

  let html = ReactDOMServer.renderToString(serverEntry);
  let htmlStr = template.replace("<!--react-ssr-outlet-->", `<div id='app'>${html}</div>`);
  // 将渲染后的html字符串发送给客户端
  res.send(htmlStr);
}

app.get("*", isProd ? render : (req, res) => {
  // 等待客户端和服务端打包完成后进行render
	readyPromise.then(() => render(req, res));
});

app.listen(3000, () => {
  console.log("Your app is running");
});
