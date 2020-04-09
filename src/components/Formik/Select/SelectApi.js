import React, { Component } from 'react';
import { Form, Select } from 'antd';

import { Text } from "fe-components";
import { API_V1 } from "fe-utils/api";
const FormItem = Form.Item;
const Option = Select.Option;

export default class SelectApi extends Component {
  mounted = false;

  state = {
    options: {},
    fetching: true
  }

  async componentWillReceiveProps(newProps) {
  
    const { profile, url } = this.state;

    // if(newProps.url !== url && newProps.url) {
    //   try {
    //     let { data: options } = await API_V1.get(newProps.url);
    //     if(Array.isArray(options)) {
    //       if(profile && profile.role == "Administrator") {
    //         options.map((item,i) => {
    //           if(item.role_name == "Super Administrator") {
    //             options.splice(i,1)
    //           }
    //         })
    //       }
    //       options = options.reduce(function(result, item) {
    //         var key = Object.values(item)[0].toString();
    //         var key2 = Object.values(item)[1].toString();
    //         result[key] = key2;
    //         return result;
    //       }, {});
    //     }
    //       this.setState({ options, profile, fetching: false, url: newProps.url });
    //     } catch (error) {
    //       this.setState({ fetching: true, url: newProps.url });
    //     }
    // }
    

  }

  async componentDidMount() {
    this.mounted = true;
    const { url } = this.props;
   
    // let profile, response =  await API_V1.get("v1/admin/user/account/details");
    // if(response &&  response.status == 200 && response.data) {
    //   profile = response.data;
    // }
   
    // try {
    //   let { data: options } = await API_V1.get(url);
    //   if(Array.isArray(options)) {
    //     if(profile && profile.role == "Administrator") {
    //       options.map((item,i) => {
    //         if(item.role_name == "Super Administrator") {
    //           options.splice(i,1)
    //         }
    //       })
    //     }
    //     options = options.reduce(function(result, item) {
    //       var key = Object.values(item)[0].toString();
    //       var key2 = Object.values(item)[1].toString();
    //       result[key] = key2;
    //       return result;
    //     }, {});
    //   }
    //   this.setState({ options, profile, fetching: false, url });
    // } catch (error) {
    //   this.setState({ fetching: true, url });
    // }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleChange = async (value) => {
    const { setFieldValue } = this.props.form;
    const { name } = this.props.field;

    // if(name == "s_stop") {
    //   await setFieldValue("led_screen_route", "");
    // }
    return setFieldValue(name, value);
  }
  
  render({fetching} = this.state) {
    const children = Object.keys(this.state.options)
      .sort((a, b) => {
        if(this.state && this.state.options && this.state.options[a] && this.state.options[b]) {
          var x=this.state.options[a].toLowerCase(),	y=this.state.options[b].toLowerCase(); 
          return x<y ? -1 : x>y ? 1 : 0;
        }
      })
      .map( (key) => {
        return <Option value={key}>{this.state.options[key]}</Option>
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
      defaultValue,
      ...props
    } = this.props;

    return (
      <FormItem
        {...layout}
        required={required}
        validateStatus={touched[field.name] && errors[field.name] && 'error'}
        help={touched[field.name] && errors[field.name]}
        style={{ marginRight: 8 }}
      >
        { label && <Text weight="bold">{label}&nbsp;</Text> }
        {
          fetching
          ? <Select loading />
          : <Select
            loading={fetching}
            {...props}
            value={ defaultValue }
            mode={ multiple ? "multiple" : null }
            filterOption={
              optionFilterProp ? 
              (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : ''
            }
            onChange={this.handleChange}
            children={children}
            showSearch
          />
           
        }
      </FormItem>
    );
  }
}