import React, { Fragment } from "react";
import { Layout, Icon, Menu } from "antd";
import { withRouter, Link } from "react-router-dom";

import Logo from "./Logo";
import { IconTrigger } from "../styled";

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;


function MainSidebar(props) {
  const { collapsed, location } = props;
  let { pathname } = location;
  let currentKey = pathname.split("/")[1];
  const array = pathname.split("/");
  if(array.length === 3 && array[2] !== "create"){
    array.pop();
    pathname = array.join("/");
  } else if(array.length === 4) {
    array.pop();
    array.pop();
    pathname = array.join("/");
  }
  // if(currentKey === "maintenance" || currentKey === "route-maintenance" || currentKey === "stop-maintenance") {
  //   currentKey = "bus"
  // }

  const handleToggleSidebar = () => {
    props.handleToggleSidebar();
  }
  
  return (
    <Sider
      collapsible
      trigger   = {null}
      collapsed = {collapsed}
      width     = {256}
      style     = {{ background: "white"}}
    >
      <Header
        collapsed = { collapsed }
        handleToggleSidebar = { handleToggleSidebar }/>

      <Menu
        style={{ height: '100%' }}
        mode="inline"
        defaultSelectedKeys={[pathname]}
        selectedKeys={[pathname]}
        defaultOpenKeys={[currentKey]}>

        {/* DASHBOARD */}
        <Menu.Item key="/dashboard">
          <Link to="/dashboard">
            <Icon type="user" /><span>Administration</span>
          </Link>
        </Menu.Item>
      
        {/* AUDIT TRAIL */}
        <Menu.Item key="/audit-trail">
          <Link to="/audit-trail"><Icon type="cluster" /><span>Workforce</span></Link>
        </Menu.Item>

      </Menu>
    </Sider>
  );
}

export default withRouter(MainSidebar);


function Header({ collapsed, handleToggleSidebar }){
  return(
    <Fragment>
      {
        collapsed
        ? <div align="center" style={{
          }}>
          <IconTrigger
          onClick={handleToggleSidebar}  
          className="trigger" type="menu" />
        </div>
        :<div
          align="center"
          className="logo-dashboard-container"
          style={{
            height: 65,
            padding: 16,
            borderRight: "solid 1px #e6ecf5"
            }}>
          <Logo />
        </div>
      }
    </Fragment>
  )
}