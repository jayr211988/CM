import React, { Component } from "react";
import { Button, Form, Icon, message, Upload } from "antd";
const FormItem = Form.Item;


export default class UploadImage extends Component {
  state = {
    fileUpload: "",
    loading: false,
    hasError: false,
  };

  beforeUpload = (file, fileList) => {

    const isJPG = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif";

    this.props.form.setFieldValue(this.props.field.name, fileList);

    if (!isJPG) {
      message.error("You can only upload JPG, PNG or GIF file!");
      return true;
    }

    return false;

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
      ...props
    } = this.props;

    return (
      <FormItem
        {...layout}
        required={required}
        label={label}
        validateStatus={touched[field.name] && errors[field.name] && "error"}
        help={touched[field.name] && errors[field.name]}
      >
        {customlabel && (
          <label
            style={{ fontWeight: "bold", display: "block", lineHeight: "20px" }}
            htmlFor={field.name}
          >
            {customlabel}
          </label>
        )}
        <Upload
          {...field}
          {...props}
          action={() => Promise.reject()}
          defaultFileList={[{
            uid: "-1",
            name: "xxx.png",
            status: "done",
            url: "http://www.baidu.com/xxx.png",
            size: 123,
            type: "imag"
          }]}
          beforeUpload={this.beforeUpload}
        >
          <Button>
            <Icon type="upload" /> Upload
          </Button>
        </Upload>
      </FormItem>
    );
  }
}
