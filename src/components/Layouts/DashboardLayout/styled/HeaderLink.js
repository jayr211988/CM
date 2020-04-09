import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


class CHeaderLink extends React.Component {
  render() {
    const { to, children } = this.props;
    return <Link to={to}>{children}</Link>;
  }
}

const HeaderLink = styled(CHeaderLink)`
  /* This renders the buttons above... Edit me! */
  padding: 0 10px;
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
  -webkit-transition: all 0.3s, padding 0s;
  transition: all 0.3s, padding 0s;

  &:hover {
    background-color: #1890ff;
    color: #fff;
  }
`;

export default HeaderLink;
