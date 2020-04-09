// LIBRARIES
import React, { useState } from "react";
import { Form, Field } from "formik";
import { Modal, Button, Row, Col } from "antd";
import { InputText } from "fe-components";

// COMPONENTS
import { Text } from "fe-components";

const UsernameForm = (props) => {
  const { isSubmitting } = props;

  const [state, setState] = useState(false);

  const handleToggle = () => setState(!state);

  return (
    <Form>
      <Field
        customlabel = "Enter Username"
        size        = "large"
        name        = "email"
        type        = "text"
        placeholder = "Enter Username"
        component   = { InputText }
        nomargin
      />

      <Row
        type    = "flex"
        justify = "space-between"
        align   = "middle"
        style   = {{ marginTop: 20 }}>
        <Col>
          <p
            style={{ color: "#1890FF", cursor: "pointer" }} 
            onClick={handleToggle}>Forgot Username</p>
        </Col>
        <Col>
          <Button
            style     = {{ width: 120 }}
            type      = "primary"
            htmlType  = "submit"
            loading   = { isSubmitting }
            block
          >Next</Button>
        </Col>
      </Row>
      
      
      <Modal
        visible   = {state}
        footer    = {null}
        closable  = {false}
        centered  = {true}
        width     = {320}
      >

        <Text size={15} weight="bold">Forgot Username</Text>
        
        <div style={{ marginTop: 12 }}>
          <Text>If you forgot your username, please email</Text>
          <Text color="#1890FF">admin@domain.com</Text>
        </div>

        <div align="right" style={{ marginTop: 12 }}>
          <Button type="primary" style={{ width: 80 }} onClick={handleToggle}>OK</Button>
        </div>
        
      </Modal>
      
    </Form>
  );
};

export default UsernameForm;
