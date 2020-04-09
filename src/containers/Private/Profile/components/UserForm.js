import React, { Fragment } from "react";
import { Row, Col } from "antd";
import { Field } from "formik";

import { InputText, CheckBox } from "fe-components";
import { SelectApi } from "fe-components/Formik/Select";

export default function UserForm(props) {
  return (
    <Fragment>
      <Row style={{ marginTop: 20 }}>
        <Col span={6}>
          <Field
            name        = "first_name"
            type        = "text"
            placeholder = "Enter first name"
            customlabel = "First Name"
            component   = { InputText }
          />
        </Col>
        <Col span={6}>
          <Field
            name        = "last_name"
            type        = "text"
            placeholder = "Enter last name"
            customlabel = "Last Name"
            component   = { InputText }
          />
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <Field
            name        = "role_name"
            type        = "text"
            placeholder = "Role"
            customlabel = "Role"
            component   = { InputText }
            disabled
          />
        </Col>
      </Row>

      <Row>
        <Col span={10}>
          <Field
            name        = "email"
            type        = "text"
            placeholder = "Enter email"
            customlabel = "Email"
            component   = { InputText }
            disabled    = {props.update}
          />
        </Col>
      </Row>

      <Row>
        <Col span={5}>
          <Field
            name        = "tel_no"
            type        = "text"
            placeholder = "Enter telephone"
            customlabel = "Telephone"
            optional
            component   = { InputText }
          />
        </Col>
      </Row>

      <Row>
        <Col span={5}>
          <Field
            name        = "mobile_no"
            type        = "text"
            placeholder = "Enter mobile number"
            customlabel = "Mobile Number"
            optional
            component   = { InputText }
          />
        </Col>
      </Row>
    </Fragment>
  )
}
