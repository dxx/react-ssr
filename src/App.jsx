import React from "react";
import { 
  BrowserRouter as Router,
  Switch,
  Redirect,
  NavLink
} from "react-router-dom";
import { Helmet } from "react-helmet";
import { router, NestedRoute, StatusRoute } from "./router";
import "./assets/app.css";

class Root extends React.Component {
  constructor(props) {
    super(props);

    if (process.env.REACT_ENV === "server") {
      // 当前如果是服务端渲染时将Helmet设置给外层组件的head属性中
      this.props.setHead(Helmet);
    }
  }
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
              router.map((route, i) => (
                <NestedRoute key={i} {...route} />
              ))
            }
            <Redirect from="/" to="/bar" exact />
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
  App = () => {
    return (
      <Router>
        <Root />
      </Router>
    );
  };
}
export default App;
