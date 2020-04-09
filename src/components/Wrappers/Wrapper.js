import React, { Component } from "react";
import { Page403, Page404, Page500 } from "fe-components/ErrorPages";

export default class Wrappers extends Component {
  render({ code, children } = this.props) {
    if (code === 403) {
      return <Page403 />;
    } else if (code === 404) {
      return <Page404 />;
    } else if (code === 500) {
      return <Page500 />;
    } else {
      return children;
    }
  }
}
