import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CTableActionButton extends React.Component {
  render() {
    return <FontAwesomeIcon icon={this.props.icon} />;
  }
}

const TableActionButton = styled(CTableActionButton)`
  color: rgba(0, 0, 0, 0.25);
  font-size: 12px;
  cursor: pointer;
`;

export default TableActionButton;
