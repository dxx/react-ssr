import * as React from "react";
import {
  Switch,
  Redirect,
  NavLink
} from "react-router-dom";
import { Helmet } from "react-helmet";
import { router, NestedRoute, StatusRoute} from "./router";
import "./assets/app.css";

class App extends React.Component {
  public render() {
    return (
      <div>
        <Helmet>
          <title>This is App page</title>
          <meta name="keywords" content="React SSR" />
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
                <NestedRoute key={i} {...route} />
              )
            }
            <Redirect from="/" to="/bar" exact={true} />
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

export default App;
