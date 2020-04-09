import React from "react";
import { Form, Field } from 'formik';
import { Link } from "react-router-dom";
import { InputText } from 'fe-components';
import { Row, Col, Button } from "antd";


const ForgotPasswordForm = props => {
  const { isSubmitting } = props;

  return (
    <Form>
      <Field
        size="large"
        customlabel="Enter Username"
        name="email"
        type="text"
        placeholder="Enter Username"
        component={InputText}
      />

      <Row
        type    = "flex"
        justify = "space-between"
        align   = "middle"
        style   = {{ marginTop: 20 }}>
        <Col>
          <Link style = {{ color: "#1890FF" }}
            to={{
              pathname: '/login',
              state: {
                successSendPassword: false,
                successSend: false,
                email: props.history.state.email
              }
            }}
          >Cancel</Link>
        </Col>
        <Col>
          <Button
            style={{ width: 120 }}
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            block
          >Next</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ForgotPasswordForm;
