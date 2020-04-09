// LIBRARIES
import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import { Formik, Form } from "formik";
import { withRouter, Link } from "react-router-dom";

// COMPONENTS
import { HeaderWrapper, ButtonWrapper, ContentWrapper } from "fe-components/Styled";
import { Text, BreadCrumb } from "fe-components";
import UserForm from "../components/UserForm";

import { StateProvider } from "fe-context";
// HELPERS
import validationSchema from "../validationSchema";
import {
  fnGetProfile,
  fnUpdateProfile,
} from "../helpers";


class Update extends Component {
  static contextType = StateProvider.useStateValue;

  mounted = false;
  state = {};

  async componentDidMount() {
    this.mounted = true;
    const response = await fnGetProfile();
    this.mounted && this.setState(response);
  }

  handleUpdateProfile = async (values, actions) => {
    const success = await fnUpdateProfile({values, actions});
    if(success) {
      this.props.history.push("/profile");
      const payload = await fnGetProfile();
      this.context.authDispatcher({ type: "PROFILE_UPDATE", payload });
    }
  }

  render() {
    if(!this.mounted) return null;
    return(
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={{
            email       : this.state.email,
            first_name  : this.state.first_name,
            last_name   : this.state.last_name,
            role        : this.state.role_id,
            role_name   : this.state.role,
            tel_no      : this.state.tel_no || "",
            mobile_no   : this.state.mobile_no || "",
            status      : this.state.status.toLowerCase() === "active" ? true : false
          }}
          validationSchema    = { validationSchema }
          onSubmit            = { this.handleUpdateProfile }
          render              = { (props)=>
            <Form noValidate>
              <HeaderWrapper>
                <Row>
                  <Col span={24}>
                    <BreadCrumb
                      items={[
                        { text: "Home" },
                        { text: "My Profile" },
                        { text: "Update" }
                      ]}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ position: "absolute", top: 15 }}>
                      <Text size={24} weight="bold">Update</Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <ButtonWrapper>
                      <Button
                        loading={props.isSubmitting}
                        type="primary"
                        htmlType="submit"
                      >Save</Button>
                      <Button>
                        <Link to="/profile">Cancel</Link>
                      </Button>
                    </ButtonWrapper>
                  </Col>
                </Row>
              </HeaderWrapper>

              <ContentWrapper>
                <Text size={24} weight="bold">User Details</Text>
                <UserForm update {...props} />
              </ContentWrapper>  
            </Form>
          }
          />
      </div>
    )
  }
}

export default withRouter(Update) 