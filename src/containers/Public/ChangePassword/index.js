import React, { Component } from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import ChangePasswordForm from "./components/ChangePasswordForm";
import { changePasswordSchema } from "./validationSchema";

import Header from "../components/Header";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import { Wrapper } from "../components/styled";

import {
  fnChangePassword
} from "./helpers";

class ChangePassword extends Component {

  componentDidMount(){
    if(!this.props.location.state){
      this.props.history.replace("/login");
    }
  }

  handleSubmit = async (values, actions) => {
    const { email } = this.props.location.state;
    values = { ...values, email };
    const result = await fnChangePassword({values, actions});
    if(result) {
      this.props.history.replace({
        pathname: '/login',
        state: { successSendPassword: true }
      })
    }
    
  }

  render() {
    return (
      <Wrapper>
        <Logo />
        <div style={{ flex: 2, width: 312 }}>
          <Header title="Change Password" description="To reset, please enter your password" />

          <Formik
            initialValues={{
              current_password: "",
              new_password: "",
              new_password_confirmation: "",
            }}
            onSubmit={this.handleSubmit}
            enableReinitialize={true}
            validationSchema={changePasswordSchema}
            component={ChangePasswordForm}
          />
        </div>

        <Footer />
      </Wrapper>
    );
  }
}

export default withRouter(ChangePassword);
