import * as React from "react";
import { Helmet } from "react-helmet";

class Foo extends React.Component {
  public render() {
    return (
      <div>
        <Helmet>
          <title>Foo</title>
        </Helmet>
        <div>Foo</div>
      </div>
    );
  }
}

export default Foo;
