import * as React from 'react';
import { Form, Icon, InputNumber } from 'antd';

const FormItem = Form.Item;

const InputForm = ({
  field,
  form: { touched, errors, setFieldValue, handleChange },
  required,
  icon,
  layout,
  ...props
}) => {
  return (
    <FormItem
      {...layout}
      required={required}
      label={props.label}
      validateStatus={touched[field.name] && errors[field.name] && 'error'}
      help={touched[field.name] && errors[field.name]}
    >
      <InputNumber
        {...field}
        {...props}
        prefix={icon && <Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />}
        min={0}
        onChange={handleChange = (value) => { setFieldValue(field.name, value) }}
      />
    </FormItem>
  );
};

export default InputForm;