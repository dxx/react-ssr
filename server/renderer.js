const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { matchRoutes } = require("react-router-config");
const { Helmet } = require("react-helmet");
const Loadable = require("react-loadable");
const { getBundles } = require("../plugin/webpack");

class ServerRenderer {
  constructor(bundle, template, manifest) {
    this.bundle = bundle;
    this.template = template;
    this.manifest = manifest;
  }
  renderToString(request) {
    return new Promise((resolve, reject) => {

      const serverEntry = this._createEntry();

      const createApp = serverEntry.createApp;
      const createStore = serverEntry.createStore;
      const router = serverEntry.router;

      const store = createStore({});

      const render = () => {
        // 存放组件内部路由相关属性，包括状态码，地址信息，重定向的url
        let context = {};

        let component = createApp(context, request.url, store);
        let modules = [];
        let root = ReactDOMServer.renderToString(
          React.createElement(
            Loadable.Capture,
            { report: moduleName => modules.push(moduleName) },
            component)
        );

        if (context.url) {  // 当发生重定向时，静态路由会设置url
          resolve({
            error: {url: context.url}
          });
          return;
        }

        if (context.statusCode) {  // 有statusCode字段表示路由匹配失败
          resolve({
            error: {code: context.statusCode}
          });
        } else {
          // store.getState() 获取预加载的state，供客户端初始化
          resolve({
            error: undefined, 
            html: this._generateHTML(root, modules, store.getState())
          });
        }
      }

      // 预先加载所有异步组件
      Loadable.preloadAll().then(() => {
        let promises;
        // 匹配路由
        let matchs = matchRoutes(router, request.path);
        promises = matchs.map(({ route, match }) => {
          const asyncData = route.asyncData;
          // match.params获取匹配的路由参数
          return asyncData ? asyncData(store, Object.assign(match.params, request.query)) : Promise.resolve(null);
        });

        // resolve所有asyncData
        Promise.all(promises).then(() => {
          // 异步数据请求完成后进行render
          render();
        }).catch(error => {
          reject(error);
        });
      });
    });
  }
  _createEntry() {
    const file = this.bundle.files[this.bundle.entry];

    // 读取内容并编译模块
    const vm = require("vm");
    const sandbox = {
      module: module,
      require: require
    };
    vm.runInNewContext(file, sandbox);

    return sandbox.module.exports;
  }
  _generateHTML(root, modules, initalState) {
    let bundles = getBundles(this.manifest, [...new Set(modules)]);

    let styles = bundles.filter(bundle => bundle.file.endsWith(".css"));
    let scripts = bundles.filter(bundle => bundle.file.endsWith(".js"));

    let cssBundles = styles.map(style => {
      return `<link rel="stylesheet" type="text/css" href="${style.publicPath}" />`
    }).join('\n');

    let jsBundles = scripts.map(script => {
      return `<script type="text/javascript" src="${script.publicPath}"></script>`
    }).join('\n');

    // 必须在组件renderToString后获取
    let head = Helmet.renderStatic();
    // 替换注释节点为渲染后的html字符串
    return this.template
    .replace(/<title>.*<\/title>/, `${head.title.toString()}`)
    .replace("<!--react-ssr-head-->", `${head.meta.toString()}\n${head.link.toString()}
    <script type="text/javascript">
      window.__INITIAL_STATE__ = ${JSON.stringify(initalState)}
    </script>
    `)
    .replace("</head>", `${cssBundles}</head>`)
    .replace("<!--react-ssr-outlet-->", `<div id='app'>${root}</div>`)
    .replace("</body>", `${jsBundles}<script>window.hydrate();</script></body>`);
  }
}

module.exports = ServerRenderer;
