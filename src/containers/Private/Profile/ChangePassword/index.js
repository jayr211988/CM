// LIBRARIES
import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import { Formik, Form } from "formik";
import { withRouter, Link } from "react-router-dom";

// COMPONENTS
import { HeaderWrapper, ButtonWrapper, ContentWrapper } from "fe-components/Styled";
import { Text, BreadCrumb } from "fe-components";
import ChangePasswordForm from "../components/ChangePasswordForm";

// HELPERS
import validationSchema from "./validationSchema";
import {
  fnGetProfile,
  fnUpdatePassword
} from "../helpers";


class Update extends Component {
  mounted = false;
  state = {};

  async componentDidMount() {
    this.mounted = true;
    const response = await fnGetProfile();
    this.mounted && this.setState(response);
  }

  handleUpdateProfile = async (values, actions) => {
    const { id: user } = this.state;
    values = { ...values, user };
    const success = await fnUpdatePassword({values, actions});
    if(success) this.props.history.push("/profile");
  }

  render() {
    if(!this.mounted) return null;
    return(
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={{
            current_password          : "",
            new_password              : "",
            new_password_confirmation : "",
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
                        { text: "Change Password" }
                      ]}
                    />
                  </Col>

                  <Col span={12}>
                    <div style={{ position: "absolute", top: 15 }}>
                      <Text size={24} weight="bold">Change Password</Text>
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
                <Text size={24} weight="bold" style={{ marginBottom: 25 }}>Change Password</Text>
                <ChangePasswordForm {...props} />
              </ContentWrapper>  
            </Form>
          }
          />
      </div>
    )
  }
}

export default withRouter(Update) 