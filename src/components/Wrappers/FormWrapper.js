import React from "react";
import { Row, Col, Breadcrumb, Button } from "antd";

import { Text } from "fe-components";
import { HeaderWrapper, ButtonWrapper } from "fe-components/Styled";

export default function FormWrapper() {
  return(
    <HeaderWrapper>
      <Row>
        <Col span={24}>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Users</Breadcrumb.Item>
            <Breadcrumb.Item>CMS Users List</Breadcrumb.Item>
            <Breadcrumb.Item>Add New</Breadcrumb.Item>
          </Breadcrumb>
        </Col>

        <Col span={12}>
          <div style={{ position: "absolute", top: 15 }}>
            <Text size={24} weight="bold">
              Add New
            </Text>
          </div>
        </Col>
        <Col span={12}>
          <ButtonWrapper>
            <Button type="primary">Save</Button>
            <Button>Cancel</Button>
          </ButtonWrapper>
        </Col>
      </Row>
    </HeaderWrapper>
  );
}