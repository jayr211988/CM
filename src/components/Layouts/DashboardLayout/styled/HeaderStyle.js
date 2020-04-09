import React from "react";
import styled from "styled-components";
import { Layout } from "antd";

const { Header } = Layout;

export default class CHeaderStyle extends React.Component {
  render() {
    return <HeaderStyle>{this.props.children}</HeaderStyle>;
  }
}

const HeaderStyle = styled(Header)`
  /* This renders the buttons above... Edit me! */
  background: #fff !important;
  padding: 0 !important;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -o-sticky;
  position: -ms-sticky;
  position: sticky;

  top: 0;
  box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
  z-index: 10;
  margin-top: -2px;
`;
