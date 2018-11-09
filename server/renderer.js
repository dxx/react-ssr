const ReactDOMServer = require("react-dom/server");
const { matchRoutes } = require("react-router-config");
const { Helmet } = require("react-helmet");
const { getLoadableState } = require("loadable-components/server");

class ServerRenderer {
  constructor(bundle, template) {
    this.template = template;
    this.serverEntry = this._createEntry(bundle);
  }
  renderToString(request) {
    return new Promise((resolve, reject) => {
      const serverEntry = this.serverEntry;

      const createApp = serverEntry.createApp;
      const createStore = serverEntry.createStore;
      const router = serverEntry.router;

      const store = createStore({});
      
      // 存放组件内部路由相关属性，包括状态码，地址信息，重定向的url
      let context = {};
      let component = createApp(context, request.url, store);

      // 提取可加载状态
      getLoadableState(component).then(loadableState => {
        let promises;
        // 匹配路由
        let matchs = matchRoutes(router, request.path);
        promises = matchs.map(({ route, match }) => {
          const asyncData = route.component.Component.asyncData;
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

        const render = () => {
          let root = ReactDOMServer.renderToString(component);
  
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
              html: this._generateHTML(root, store.getState(), loadableState.getScriptTag())
            });
          }
        }
      });
    });
  }
  _createEntry(bundle) {
    const file = bundle.files[bundle.entry];

    // 读取内容并编译模块
    const vm = require("vm");
    const sandbox = {
      console,
      module,
      require
    };
    vm.runInNewContext(file, sandbox);

    return sandbox.module.exports;
  }
  _generateHTML(root, initalState, scriptTag) {
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
    .replace("<!--react-ssr-outlet-->", `<div id='app'>${root}</div>\n${scriptTag}`)
  }
}

module.exports = ServerRenderer;