import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Layout } from "antd";

import MainHeader from "./components/MainHeader";
import MainSidebar from "./components/MainSidebar";

const { Content } = Layout;

class DashboardLayout extends Component {
  mounted = false;
  state = {
    collapsed: false,
    width: 0,
    height: 0
  };

  componentDidMount() {
    this.updateWindowDimensions();
    this.mounted = true;
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    this.mounted = false;
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleToggleSidebar = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }
  render({ children } = this.props) {
    const hasReachMinWidth = this.state.width < 500 && this.mounted;
    
    return (
      <Layout style={{ height: "100%" }}>
        <MainSidebar
          profile={this.props && this.props.profile}
          collapsed           = { this.state.collapsed || hasReachMinWidth }
          handleToggleSidebar = { this.handleToggleSidebar }
        />
        <Layout style={{ background: "#FCFCFC" }}>
          <MainHeader
            hasReachMinWidth    = { hasReachMinWidth }
            collapsed           = { this.state.collapsed || hasReachMinWidth }
            handleToggleSidebar = { this.handleToggleSidebar }
          />
          <Content>
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(DashboardLayout);
