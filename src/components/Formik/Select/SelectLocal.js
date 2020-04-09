import React, { Component } from 'react';
import { Form, Select } from 'antd';
import { Text } from "fe-components";

const FormItem = Form.Item;
const Option = Select.Option;

export default class SelectApi extends Component {
  state = {
    options: {},
    mounted: false
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  handleChange = (value) => {
    const { setFieldValue } = this.props.form;
    const { name } = this.props.field;

    return setFieldValue(name, value);
  }
  render() {
    //if(!this.state.mounted) return null;
    const children = Object.keys(this.props.options).map( (key) => {
      return <Option value={key}>{this.props.options[key]}</Option>
    });

    const {
      field,
      form: { touched, errors },
      layout,
      label,
      required,
      optionFilterProp,
      value,
      multiple,
      isRequired,
      ...props
    } = this.props;

    return (
      <FormItem
        {...layout}
        required={required}
        validateStatus={touched[field.name] && errors[field.name] && 'error'}
        help={touched[field.name] && errors[field.name]}
      >
        { label && <Text weight="bold">{label}&nbsp;{isRequired && <span style={{color: '#97255c'}}>*</span>}</Text> }
        <Select
          {...props}
          mode={ multiple ? "multiple" : null }
          filterOption={
            optionFilterProp ? 
            (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : ''
          }
          onChange={this.handleChange}
          children={children}
          showSearch
          >
        </Select>
      </FormItem>
    );
  }
}