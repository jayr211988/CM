import React from "react";
import { Form, Field } from 'formik';
import { Link } from "react-router-dom";
// import { InputText } from 'fe-components';
import { Row, Col, Button } from "antd";
import { InputPassword,PasswordStrengthMeter } from "fe-components";

const ChangePasswordForm = props => {
  const { isSubmitting } = props;
  
  return (
    <Form>
      <Field
        customlabel="Temporary Password"
        name="current_password"
        type="password"
        placeholder="Enter temporary password"
        component={InputPassword}
      />

      <div>
        <Field
          customlabel="New Password"
          name="new_password"
          type="password"
          placeholder="Enter new password"
          component={InputPassword}
        />
        <PasswordStrengthMeter 
          password={props.values.new_password} 
        />
      </div>

      <Field
        customlabel="Confirm Password"
        name="new_password_confirmation"
        type="password"
        placeholder="Confirm Password"
        component={InputPassword}
      />

      <Row
        type    = "flex"
        justify = "space-between"
        align   = "middle"
        style   = {{ marginTop: 20 }}>
        <Col>
          <Link style = {{ color: "#1890FF" }} to="/login">Cancel</Link>
        </Col>
        <Col>
          <Button
            style={{ width: 120 }}
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            block
          >Submit</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ChangePasswordForm;
