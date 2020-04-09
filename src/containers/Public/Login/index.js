import React, { Component } from "react";
import { Formik } from "formik";
import { Modal, Button } from "antd"
import { withRouter } from "react-router-dom";
import PasswordForm from "./components/PasswordForm";
import UsernameForm from "./components/UsernameForm";
import { usernameSchema, passwordSchema } from "./validationSchema";
import { fnLoginSubmit, fnUsernameChecker } from "./helper";

import { StateProvider } from "fe-context";
import { Text } from "fe-components"

import Header from "../components/Header";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import { Wrapper } from "../components/styled";

import {
  fnGetProfile
} from "./helpers";

class Login extends Component {
  static contextType = StateProvider.Context;

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      successSend: props.history.location.state && props.history.location.state.successSend,
      successSendPassword: props.history.location.state && props.history.location.state.successSendPassword,
      historyStateEmail: props.history.location.state && props.history.location.state.email
    };
  }

  handleCheckEmail = async (values, actions) => {
    const response = await fnUsernameChecker(values, actions);
    if (response && response.email) {
      this.setState({ email: values.email });
    }
  }

  handleSubmit = async (values, actions) => {
    this.props.history.push("/dashboard");
    //const result = await fnLoginSubmit(values, actions);
    console.log(this.context,'testsdsf')
    this.context.authDispatcher({ type: "PROFILE_UPDATE", payload: {name: "Rogelio" } });
    localStorage.setItem("token", "12345435");
    // if (result) {
    //   if (result.temporary) {
    //     this.props.history.replace("/change-password", { username: values.username });
    //   } else {
    //     if (result.status === undefined && (result.temporary || result.temporary === undefined)) {
    //       return
    //     } else {
    //       const payload = await fnGetProfile();
    //       this.context.authDispatcher({ type: "PROFILE_UPDATE", payload });
    //     }
    //   }
    // }
  }

  handleChangeUsername = () => {
    this.setState({
      email: "",
      historyStateEmail: "",
      successSend: false,
      successSendPassword: false,
    });
  }

  handleOk = () => {
    this.setState({
      successSend: false,
      successSendPassword: false
    })

    this.props.history.replace({
      state: { successSend: false }
    })
  }

  render() {
    return (
      <Wrapper>
        <header>
          <Logo />
          <div className="border-gradient"></div>
        </header>

        <section className="login-form-container">
          <Header title="Sign in" />
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={this.handleSubmit}
            enableReinitialize={true}
            validationSchema={passwordSchema}
            render={(formikProps) => (
              <PasswordForm
                {...formikProps}
                handleChangeUsername={this.handleChangeUsername}
              />
            )}
          />
        </section>

        <footer>
          <Footer />
        </footer>
        

      </Wrapper>
    );
  }
}


export default withRouter(Login);