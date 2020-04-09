// LIBRARIES
import React, { Component } from "react";

// COMPONENTS
import { Menu, Dropdown, Icon } from "antd";

export default class StatusUpdate extends Component {

  updateDropDown = async(e) => {
    let params = e.item.props.record;
    params = { 
      [this.props.keyPair]: e.key,
      [this.props.keyValue]: params[this.props.keyValue]
    };
    this.props.handleUpdateStatus(params);
  }

  render(){
    const { record } = this.props;
    const isOwnProfile = this.props && this.props.record && this.props.profile && this.props.record.name == this.props.profile.name;
    const isSuperAdmin =  this.props && this.props.record && this.props.profile &&
      ( this.props.record.role == "Super Administrator" && this.props.profile.role == "Administrator")

      const isSuperAdminRole = isOwnProfile || isSuperAdmin;
    const menu = (
      <Menu>
        <Menu.Item key="active" onClick={this.updateDropDown} record={record}>Active</Menu.Item>
        <Menu.Item key="inactive" onClick={this.updateDropDown} record={record}>Inactive</Menu.Item>
      </Menu>
    );
    return(
      <Dropdown 
        disabled={
          this.props.profile && this.props.profile.email == record.email ? 
          true : isSuperAdminRole ? true : false} 
          overlay={menu} 
          trigger={['click']}
      >
        <p
          className="ant-dropdown-link capitalize"
          style={{
            color: record[this.props.keyPair].toLowerCase() === "inactive"
              ? "rgba(24, 144, 255, 0.3)"
              : "#1890FF",
              cursor: this.props.profile && this.props.profile.email == record.email 
              ? "not-allowed" : isSuperAdminRole ? "not-allowed" : "pointer",
              textAlign: "right",
            opacity: this.props.profile && this.props.profile.email == record.email 
              ? 0.5 : isSuperAdminRole ? 0.5 : 1,
            width: '80px'
          }}>
          {record[this.props.keyPair]} <Icon type="caret-down" theme="outlined"
          style={{ fontSize: 10 }} />
        </p>
      </Dropdown>
    )
  }
}