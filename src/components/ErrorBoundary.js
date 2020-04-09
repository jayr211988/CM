import React, { Component } from "react";
import { SomethingWentWrong } from "fe-components/ErrorPages";

export default class ErrorBoundary extends Component {

  state = {
    hasError: false
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render({ hasError } = this.state) {
    if (hasError) {
      return <SomethingWentWrong />;
    }
    return this.props.children;
  }
}
