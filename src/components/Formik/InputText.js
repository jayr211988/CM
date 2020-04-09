import React from "react";
import { Form, Icon, Input } from "antd";

import { Text } from "fe-components";

const FormItem = Form.Item;

export default function InputText(props) {
  const {
    field,
    form: { touched, errors },
    required,
    icon,
    layout,
    label,
    customlabel,
    isRequired,
    optional,

    size,
    type,
    placeholder,
    disabled
  } = props;

  return (
    <FormItem
      {...layout}
      required={required}
      label={label}
      validateStatus={touched[field.name] && errors[field.name] && "error"}
      help={touched[field.name] && errors[field.name]}
    >
      { customlabel && 
        <div style={{ display: "flex" }}>
          <Text style={{ lineHeight: 1.8 }} weight="bold">{customlabel}&nbsp;{isRequired && <span style={{color: '#97255c'}}>*</span>}</Text>
          { optional && <Text style={{ lineHeight: 1.8 }} color="#B8BBC9">(optional)</Text> }
        </div>
      }

      <Input
        {...field}
        size={size}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        prefix={icon && <Icon type={icon} style={{ color: "rgba(0,0,0,.25)" }} />}
      />
    </FormItem>
  );
}
