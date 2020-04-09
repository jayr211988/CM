import React, { Component } from "react";
import { Form, Icon } from "antd";
import { InputSearch } from "./styled";
import { Text } from "fe-components";

const FormItem = Form.Item;

export default class InputPassword extends Component {
  state = {
    showPassword: false,
  };
  handleTogglePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  render() {
    const {
      field,
      form: { touched, errors },
      required,
      icon,
      layout,
      label,
      customlabel,
      size,
      placeholder,
    } = this.props;

    return (
      <FormItem
        {...layout}
        required={required}
        label={label}
        validateStatus={touched[field.name] && errors[field.name] && "error"}
        help={touched[field.name] && errors[field.name]}
      >
        {customlabel && <Text style={{ lineHeight: 1.8 }} weight="bold"> {customlabel} </Text>}
        <InputSearch
          {...field}
          className="eye-password"
          size={size}
          placeholder={placeholder}
          prefix={icon && <Icon type={icon} style={{ color: "rgba(0,0,0,.25)" }} />}
          style={{ borderRight: 0 }}
          type={this.state.showPassword ? "text" : "password"}
          addonAfter={
            <p onClick={this.handleTogglePassword} style={{ cursor: "pointer" }}>
              <img
                src={ 
                  this.state.showPassword
                  ? require("fe-common/assets/img/ic_eye@2x.png")
                  : require("fe-common/assets/img/ic_eye-strikethrough@2x.png")
                }
                style={{
                  height: 15,
                  width: 15,
                }} alt="" />
            </p>
          }
        />
      </FormItem>
    );
  }
}
