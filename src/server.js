const express = require("express");
const fs = require("fs");
const path = require("path");
const ReactDOMServer = require("react-dom/server");
const app = express();

const isProd = process.env.NODE_ENV === "production";

let createApp;
let template;
let readyPromise;
if (isProd) {
  let serverEntry = require("../dist/entry-server");
  createApp = serverEntry.createApp;
  template = fs.readFileSync("./dist/index.html", "utf-8");
  // 静态资源映射到dist路径下
  app.use("/dist", express.static(path.join(__dirname, "../dist")));
} else {
  readyPromise = require("./setup-dev-server")(app, (serverEntry, htmlTemplate) => {
    createApp = serverEntry.createApp;
    template = htmlTemplate;
  });
}


app.use("/public", express.static(path.join(__dirname, "../public")));

/* eslint-disable no-console */
const render = (req, res) => {
  console.log("======enter server======");
  console.log("visit url: " + req.url);

  // 存放组件内部路由相关属性，包括状态码，地址信息，重定向的url
  let context = {};
  let component = createApp(context, req.url);
  let html = ReactDOMServer.renderToString(component);

  if (context.url) {  // 当发生重定向时，静态路由会设置url
    res.redirect(context.url);
    return;
  }

  if (!context.status) {  // 无status字段表示路由匹配成功
    // 获取组件内的head对象，必须在组件renderToString后获取
    let head = component.type.head.renderStatic();
    // 替换注释节点为渲染后的html字符串
    let htmlStr = template
    .replace(/<title>.*<\/title>/, `${head.title.toString()}`)
    .replace("<!--react-ssr-head-->", `${head.meta.toString()}\n${head.link.toString()}`)
    .replace("<!--react-ssr-outlet-->", `<div id='app'>${html}</div>`);
    // 将渲染后的html字符串发送给客户端
    res.send(htmlStr);
  } else {
    res.status(context.status).send("error code：" + context.status);
  }
}

app.get("*", isProd ? render : (req, res) => {
  // 等待客户端和服务端打包完成后进行render
	readyPromise.then(() => render(req, res));
});

app.listen(3000, () => {
  console.log("Your app is running");
});
