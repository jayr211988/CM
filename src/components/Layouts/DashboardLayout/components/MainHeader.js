import React from "react";
import { Row, Col, Layout } from "antd";
import HeaderDropdown from "./HeaderDropdown";
import { IconTrigger } from "../styled";

import Logo from "./Logo";

const { Header } = Layout;

export default function MainHeader(props) {
  const { collapsed, handleToggleSidebar } = props;

  return (
    <Header style={{
      background: "#fff",
      padding: 0,
      position: "sticky",
      top: 0,
      boxShadow: "0px 1px 4px 0px rgba(0, 21, 41, 0.12)",
      zIndex: 10,
    }}>
      <div className="yondu-header-tag">
        <div>Yondu Inc.</div>
      </div>
      <Row type="flex" justify="space-between">
        <Col>
          {
            !collapsed
            ? <IconTrigger
                className="trigger"
                type={"menu"}
                onClick={handleToggleSidebar}
              />
            : null
          }
        </Col>
        <Col>
          <HeaderDropdown />
        </Col>
      </Row>
    </Header>
  );
}
