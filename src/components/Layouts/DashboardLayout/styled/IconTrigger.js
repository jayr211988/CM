import React from "react";
import styled from "styled-components";
import { Icon } from "antd";

class CIconTrigger extends React.Component {
  render() {
    return <Icon {...this.props} />;
  }
}

const IconTrigger = styled(CIconTrigger)`
  /* This renders the buttons above... Edit me! */
  font-size: 20px;
  line-height: 64px;
  cursor: pointer;
  -webkit-transition: all 0.3s, padding 0s;
  transition: all 0.3s, padding 0s;
  padding: 0 30px;
  vertical-align: middle;
  &:hover {
    color: #FF8A00;
  }
`;

export default IconTrigger;
