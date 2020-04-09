import React, { Component } from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import { forgotPasswordSchema } from "./validationSchema";
import { fnForgotPassword } from "./helpers";

import Header from "../components/Header";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import { Wrapper } from "../components/styled";

class ForgotPassword extends Component {

  state = {
    isOpen: false
  }

  componentDidMount() {
    // console.log(this.props,'testsetes')
    // this.props.history.replace({
    //   //state: { successSend: false }
    // })
  }

  handleSubmit = async (values, actions) => {
    const result = await fnForgotPassword({values, actions});
    if(result) {
      this.props.history.replace({
        pathname: '/login',
        state: { successSend: true }
      })
    }
  };

  render() {
    return (
      <Wrapper>
        <Logo />
        <div style={{ flex: 1.5, width: 312 }}>
          <Header title="Password Reset" description="To reset, please enter your username" />

          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={this.handleSubmit}
            validationSchema={forgotPasswordSchema}
            render={(props)=><ForgotPasswordForm history={this.props.history.location} {...props} /> }
          />
        </div>

        <Footer />
      </Wrapper>
    );
  }
}

export default withRouter(ForgotPassword);
