// LIBRARIES
import React, { Fragment, useState } from "react";
import { Tree, TreeNode } from 'react-organizational-chart'
import styled from "styled-components";
import { Row, Col, Dropdown, Avatar, Menu, Icon, message, Select } from "antd";

// COMPONENTS
import { HeaderWrapper, ContentWrapper } from "fe-components/Styled";
import { Text, CardInfo } from "fe-components";
import ReusableTableHook from "./ReusableTable"

// COMPONENTS

export default function Workforce() {

  const [state, setState] = useState({ tabName: "employee_management" });

  const toggleTabHandler = (params) => {
    console.log(params)
    setState({
      ...state,
      tabName: params
    })
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <Icon type="user" />
        1st menu item
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="user" />
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3">
        <Icon type="user" />
        3rd item
      </Menu.Item>
    </Menu>
  );

  function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  function handleChangeBUnit(value) {
    console.log(`selected ${value}`);
    message.info(`selected ${value}`);
  }

  function handleChangeDepartments(value) {
    console.log(`selected ${value}`);
    message.info(`selected ${value}`);
  }

  return (
    <Fragment>
      <HeaderWrapper>
        <Row>
          <Col span={12}>
            <div style={{ position: "absolute", top: '-35px' }}>
              <Text size={22} weight="bold">Workforce</Text>
            </div>
            <div style={{ position: "absolute", top: 2, display: 'flex' }} >
              <div className="tab-navigation-calltree" onClick={() => toggleTabHandler('employee_management')}>
                <Text size={15} weight="500" color={state.tabName === "employee_management" ? '#6a0e98' : 'rgb(45, 36, 37)'}>Employee Management</Text>
                {state.tabName === "employee_management" && <div style={styles.underline}></div>}
              </div>
              <div style={{ margin: "0 10px" }}>
                |
                </div>
              <div className="tab-navigation-calltree" onClick={() => toggleTabHandler('call_tree')}>
                <Text size={15} weight="500" color={state.tabName === "call_tree" ? '#6a0e98' : 'rgb(45, 36, 37)'}>Call Tree</Text>
                {state.tabName === "call_tree" && <div style={styles.underline}></div>}
              </div>
            </div>
          </Col>
        </Row>
      </HeaderWrapper>

      {
        state.tabName === "employee_management"
          ? (
            <ContentWrapper>
              <ReusableTableHook />
            </ContentWrapper>
          )
          : (
            <ContentWrapper>
              <div className="header-title">
                <div style={{ marginTop: 15, fontWeight: 600 }}>Worfkforce / Organizational Chart</div>
                <DropDownContainer>
                  <Select defaultValue="All Busniness Unit" style={{ marginLeft: 10, width: 240 }} onChange={handleChangeBUnit}>
                    <Select.Option value="All Busniness Unit">All Busniness Unit</Select.Option>
                    <Select.Option value="AAAAAA">AAAAAA</Select.Option>
                    <Select.Option value="BBBBBB">BBBBBB</Select.Option>
                  </Select>
                  <Select defaultValue="All Departments" style={{ marginLeft: 15, width: 240 }} onChange={handleChangeDepartments}>
                    <Select.Option value="All Departments">All Departments</Select.Option>
                    <Select.Option value="TECH">TECH</Select.Option>
                    <Select.Option value="Human Resource">Human Resource</Select.Option>
                  </Select>
                </DropDownContainer>
              </div>

              <div className="calltree-group-chart-container">
                <Tree
                  lineWidth={"2px"}
                  lineColor={"#511565"}
                  lineBorderRadius={"10px"}
                  label={<StyledNode>
                    <CardInfo name="John Penaflorida" position="President" contact="+69354445096"/>
                  </StyledNode>}
                >
                  <TreeNode label={
                    <StyledNode>
                      <CardInfo name="Test Child 1" position="HR President" contact="+69354445096"/>
                    </StyledNode>}>
                      <TreeNode label={
                        <StyledNode>
                          <CardInfo name="Child" position="Position" contact="+69354445096"/>
                        </StyledNode>
                      }/>
                  </TreeNode>

                  <TreeNode label={<StyledNode><CardInfo name="Child 2" position="Position" contact="+69354445096"/></StyledNode>}>

                    <TreeNode label={<StyledNode><CardInfo name="Grand Child" position="Position" contact="+69354445096"/></StyledNode>}>
                      <TreeNode label={<StyledNode><CardInfo name="Great Grand Child 1 " position="Position" contact="+69354445096"/></StyledNode>} />
                    </TreeNode>
                  </TreeNode>

                  <TreeNode label={<StyledNode><CardInfo name="Child 3" position="Position" contact="+69354445096"/></StyledNode>}>
                    <TreeNode label={<StyledNode><CardInfo name="Grand Child 1" position="Position" contact="+69354445096"/></StyledNode>} />
                  </TreeNode>
{/* 
                  <TreeNode label={<StyledNode><CardInfo name="Child 4" position="Position" contact="+69354445096"/></StyledNode>}>
                    <TreeNode label={<StyledNode><CardInfo name="Grand Child 1" position="Position" contact="+69354445096"/></StyledNode>} />
                  </TreeNode>

                  <TreeNode label={<StyledNode><CardInfo name="Child 5" position="Position" contact="+69354445096"/></StyledNode>}>
                    <TreeNode label={<StyledNode><CardInfo name="Grand Child 1" position="Position" contact="+69354445096"/></StyledNode>} />
                  </TreeNode>

                  <TreeNode label={<StyledNode><CardInfo name="Child 6" position="Position" contact="+69354445096"/></StyledNode>}>
                    <TreeNode label={<StyledNode><CardInfo name="Grand Child 1" position="Position" contact="+69354445096"/></StyledNode>} />
                  </TreeNode>

                  <TreeNode label={<StyledNode><CardInfo name="Child 7" position="Position" contact="+69354445096"/></StyledNode>}>
                    <TreeNode label={<StyledNode><CardInfo name="Grand Child 1" position="Position" contact="+69354445096"/></StyledNode>} />
                  </TreeNode>

                  <TreeNode label={<StyledNode><CardInfo name="Child 8" position="Position" contact="+69354445096"/></StyledNode>}>
                    <TreeNode label={<StyledNode><CardInfo name="Grand Child 1" position="Position" contact="+69354445096"/></StyledNode>} />
                  </TreeNode> */}
                </Tree>
              </div>
            </ContentWrapper>
          )
      }

    </Fragment>
  );
}


const styles = {
  underline: {
    position: 'relative',
    width: '100%',
    height: '3px',
    background: '#6A0998'
  },
  buttonStyle: {
    cursor: 'pointer',
  }
}
const DropDownContainer = styled.div`
  margin-top: 15px;
  margin-left: -10px;
`;

const StyledNode = styled.div`
  padding: 5px 10px;
  width: 150px;
  border-radius: 20px;
  display: inline-block;
  border: 1px solid #6a0e9814;
  height: 78px;
  line-height: 15px;
  background: #eeeeee;
`;

