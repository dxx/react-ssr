import * as React from "react";
import { Helmet } from "react-helmet";

class Baz extends React.Component {
  public render() {
    return (
      <div>
        <Helmet>
          <title>Baz</title>
        </Helmet>
        <div>Baz</div>
      </div>
    );
  }
}

export default Baz;
