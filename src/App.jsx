import React from "react";
import { 
  BrowserRouter as Router,
  Switch,
  Redirect,
  NavLink
} from "react-router-dom";
import { Helmet } from "react-helmet";
import { router, NestedRoute, StatusRoute} from "./router";
import createStore from "./redux/store";
import "./assets/app.css";

class Root extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>This is App page</title>
          <meta name="keywords" content="React SSR"></meta>
        </Helmet>
        <div className="title">This is a react ssr demo</div>
        <ul className="nav">
          <li><NavLink to="/bar">Bar</NavLink></li>
          <li><NavLink to="/baz">Baz</NavLink></li>
          <li><NavLink to="/foo">Foo</NavLink></li>
          <li><NavLink to="/top-list">TopList</NavLink></li>
        </ul>
        <div className="view">
          <Switch>
            {
              router.map((route, i) => 
                <NestedRoute key={i} {...route}/>
              )
            }
            <Redirect from="/" to="/bar" exact/>
            <StatusRoute code={404}>
              <div>
                <h1>Not Found</h1>
              </div>
            </StatusRoute>
            {/*<Route path="/bar" component={Bar} />
            <Route path="/baz" component={Baz} />
            <Route path="/foo" component={Foo} />
            <Route path="/top-list" component={TopList} />
            <Redirect from="/" to="/bar" exact />
            */}
          </Switch>
        </div>
      </div>
    );
  }
}

let App;
if (process.env.REACT_ENV === "server") {
  // 服务端导出Root组件
  App = Root;
} else {
  const Provider = require("react-redux").Provider;
  // 获取服务端初始化的state，创建store
  const initialState = window.__INITIAL_STATE__;
  const store = createStore(initialState);
  App = () => {
    return (
      <Provider store={store}>
        <Router>
          <Root />
        </Router>
      </Provider>
    );
  };
}
export default App;
