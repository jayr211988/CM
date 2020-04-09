// LIBRARIES
import React, { Component } from "react";
import { Input, InputNumber, Form } from 'antd';

import { EditableContext } from "./context";

//import { API_V1 } from "fe-utils/api";

export default class EditableCell extends Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input 
      maxLength={this.props.limitcharacterinput ? this.props.limitcharacterinput : null}
    />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      // data: dataRecord,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {
          editing
          ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: 'This is a required field.',
                },
                {
                  pattern: (dataIndex == "stop_name" || dataIndex == "stop_code") ? /^[A-Za-z0-9 ,.'_-]+$/  :  /^[A-Za-z0-9 /!:(),.'_-]+$/,
                  message: "Invalid characters."
                },
                {
                  pattern: /^.{0,50}$/,
                  message: "Maximum character is 50."
                },
                {
                  validator: async (rule, value) => {
                  //   if(dataRecord) {
                  //     let params = {}
                  //     dataRecord.map(item=> {
                  //       if(item.bus_code == record[dataIndex]) {
                  //         params = {...item }
                  //       }
                  //     })
                  //     params.bus_code = value;
                  //     params.bus_status = params.bus_status && params.bus_status.toLowerCase() === "pending" ? "active" : params.bus_status

                  //     try {
                  //       await API_V1.put("v1/bus/maintenance/update", {
                  //         ...params,
                  //         bus_status: params.bus_status && params.bus_status.toLowerCase() === "pending" ? "active" : params.bus_status
                  //       });
                  //     } catch (error) {
                  //       throw new Error('Bus Code should be unique.');
                  //     }
                  //   }
                  }

                }
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
          )
          : children
        }
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}