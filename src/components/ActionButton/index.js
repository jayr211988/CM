import React from "react";
import { Button, Row, Icon } from "antd";
import { Link } from "react-router-dom";


const ActionButton = (props) => {
  const { style, htmlType, disabled, text, path, pathtext, actiontask } = props;
  return (
    <Row className="ant-row ant-form-item">
      {path && (
        <Link to={path}>
          <Icon type="arrow-left" /> {pathtext}
        </Link>
      )}
      {actiontask && (
        <a href="#" role="button" onClick={actiontask}>
          <Icon type="arrow-left" /> {pathtext}
        </a>
      )}

      <Button
        type="primary"
        htmlType={htmlType}
        disabled={disabled}
        size="small"
        style={{
          float: "right",
          padding: "0 68px",
          borderRadius: 20,
          height: 40,
          fontWeight: "bold",
          ...style,
        }}
      >
        {text}
      </Button>
    </Row>
  );
};

export default ActionButton;
