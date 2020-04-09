import React from "react";
import { Form, Field } from "formik";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import { InputPassword, InputText } from "fe-components";

export default function PasswordForm(props) {
  
  const { isSubmitting } = props;
  
  return (
    <Form>
    
      <Field
        customlabel = "Enter Username"
        size        = "large"
        name        = "username"
        type        = "text"
        placeholder = "Username"
        component   = { InputText }
      />
      
      <Field
        customlabel = "Enter Password"
        size        = "large"
        name        = "password"
        type        = "password"
        placeholder = "Password"
        component   = { InputPassword }
      />

      <Row
        type    = "flex"
        justify = "center"
        align   = "middle"
        style   = {{ marginTop: 20 }}>
        <Col>
          <Button
            className="login-btn"
            style     = {{ width: 120 }}
            type      = "primary"
            htmlType  = "submit"
            loading   = { isSubmitting }
            block
          >Login</Button>
        </Col>
      </Row>
    </Form>
  );
};


const styles = {
  imgStyle: {
    height: 15,
    width: 15,
    marginLeft: 5,
    alignSelf: "center"
  }
}