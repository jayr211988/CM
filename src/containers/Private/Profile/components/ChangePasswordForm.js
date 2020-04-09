import React from "react";
import { Form, Field } from 'formik';
// import { Link } from "react-router-dom";
// import { InputText } from 'fe-components';
import { Row, Col, Button } from "antd";
import { InputPassword, PasswordStrengthMeter  } from "fe-components";

const ChangePasswordForm = props => {
  return (
      <Row>
        <Col span={13}>
          <Field
              customlabel="Current Password"
              name="current_password"
              type="password"
              placeholder="Enter current password"
              component={InputPassword}
            />
        </Col>
        <Col span={13}>
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
        </Col>
        <Col span={13}>
          <Field
            customlabel="Confirm Password"
            name="new_password_confirmation"
            type="password"
            placeholder="Confirm Password"
            component={InputPassword}
          />
        </Col>
      </Row>
  );
};

export default ChangePasswordForm;
