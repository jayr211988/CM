import React from "react";
import { Dropdown, Menu, notification } from "antd";
import { Link } from "react-router-dom";
import { StateProvider } from "fe-context";
import { HeaderButton } from "./styled";

function HeaderDropdown(props) {
  const { profile, fnLogout } = StateProvider.useStateValue();

  const handleLogout = () => {
    fnLogout()
    localStorage.removeItem("token");
    notification.open({
      message: "Success.",
      description: "You have successfully logged out from your account.",
      style: { background: '#F6FFED', boxShadow: '0 0 3px #52C41A' }
    });
  };

  const menu = (
    <Menu id="dropdownMenuHeaderNav" style={{ width: 150 }}>
      <Menu.Item key="0">
        <Link
          style={{ marginLeft: 10 }}
          to="/profile" rel="noopener noreferrer" >
          My Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        {
          profile.isAuthenticated &&
          <p
            style={{ marginLeft: 23, cursor: "pointer" }}
            role="button" onClick={handleLogout}>Logout</p>
        }
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} >
      <HeaderButton role="button" style={
        profile && profile.name && profile.name.length > 20 
        ? { ...ellipsisTextLimit } 
        : { marginRight: 16}
      }>
        <img
          alt=""
          src={ require("fe-common/assets/img/ic_user-profile@2x.png") }
          style={{height: 20, width: 20, marginRight: 10}}
        />
        { profile.name}
        <img
          alt=""
          src={ require("fe-common/assets/img/ic_chevron-down@2x.png") }
          style={{height: 15, width: 15, marginLeft: 20}}
        />
      </HeaderButton>
    </Dropdown>
  );
}

export default HeaderDropdown;


const ellipsisTextLimit = {
  width: "300px",
  overflow:"hidden", 
  whiteSpace:"nowrap", 
  textOverflow: "ellipsis",
  marginRight: 16,
}