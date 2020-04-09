import React from "react";
import { Row, Col } from "antd";

function LoginLayout({ children }) {
  return (
    <Row type="flex" align="middle" className="login-form">
        <Col className="login-form-wrapper" lg={{ span: 24 }} xs={{ span: 24 }} style={{ height: "100vh" }}>
            {children}
        </Col>
    </Row>
  );
}

export default LoginLayout;
