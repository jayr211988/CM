import * as React from "react";
import { Form, Icon, Input } from "antd";
const FormItem = Form.Item;

export default function InputSearch(props) {
  const {
    field,
    form: { touched, errors },
    required,
    icon,
    layout,
    label,
    size,
    type,
    placeholder,
    onSearch,
  } = props;

  return (
    <FormItem
      {...layout}
      className="test World"
      required={required}
      label={label}
      validateStatus={touched[field.name] && errors[field.name] && "error"}
      help={touched[field.name] && errors[field.name]}
    >
      <Input.Search
        {...field}
        size={size}
        type={type}
        placeholder={placeholder}
        style={{ maxWidth: 220 }}
        onSearch={onSearch}
        prefix={icon && <Icon type={icon} style={{ color: "rgba(0,0,0,.25)" }} />}
      />
    </FormItem>
  );
}
