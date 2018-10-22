import * as React from "react";
import { Helmet } from "react-helmet";

class Bar extends React.Component {
  public render() {
    return (
      <div>
        <Helmet>
          <title>Bar</title>
        </Helmet>
        <div>Bar</div>
      </div>
    );
  }
}

export default Bar;
