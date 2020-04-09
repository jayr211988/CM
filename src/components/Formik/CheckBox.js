import React from 'react';
import { Checkbox, Form } from 'antd';
const FormItem = Form.Item;

const CheckboxForm = ({
  field: { name, ...field },
  form: { touched, errors, setFieldValue },
  label,
  inline,
  ...props
}) => {
  if (inline) {
    return (
      <Checkbox
        {...props}
        {...field}
        name={name}
        defaultChecked={field.value}
        onChange={ (value) => { setFieldValue(name, !field.value) }}
      >
        <span className="dark-gray">{label}</span>
      </Checkbox>
    )
  } else {
    return (
      <FormItem
        validateStatus={touched[name] && errors[name] && 'error'}
        help={touched[name] && errors[name]}
      >
        <Checkbox
          {...props}
          {...field}
          name={name}
          type="checkbox"
          defaultChecked={field.value}
          onChange={ (value) => { setFieldValue(name, !field.value) }}
        >
          <span className="custom-checkbox">{label}</span>
        </Checkbox>
      </FormItem>

    );
  }

};

export default CheckboxForm;