// LIBRARIES
import React, { Component, Fragment } from "react";
import { Row, Col } from "antd";

// COMPONENTS
import { HeaderWrapper } from "fe-components/Styled";
import { Text, AdvancedTable, BreadCrumb } from "fe-components";
import SearchHeader from "fe-components/AdvancedTable/components/SearchHeader";

export default class RoleTable extends Component {
  render() {
    const api = "";
    const exportCSV = "v1/admin/audit/export_csv";
    const keyValue = "uuid";
    return (
      <Fragment>
        <HeaderWrapper>
          <Row>
            <Col span={24}>
              {/* <BreadCrumb
                items={[
                  { text: "Home" },
                  { text: "Audit Trail" }
                ]}
              /> */}
            </Col>
            <Col span={12}>
              <div style={{ position: "absolute", top: '-35px' }}>
                <Text size={22} weight="bold">Workforce</Text>
              </div>
              <div style={{ position: "absolute", top: 2, display: 'flex' }}>
                <div>
                  <Text size={15} weight="500" >Employee Management</Text>
                  <div style={styles.underline}></div>
                </div>
                <div  style={{margin: "0 10px"}}>
                  |
                </div>
                <div>
                  <Text size={15} weight="500" >Call Tree</Text>
                  <div style={styles.underline}></div>
                </div>
                
              </div>
            </Col>
          </Row>
        </HeaderWrapper>

        
      </Fragment>
    );
  }
}


const styles = {
  underline: {
    position: 'relative',
    width: '100%',
    height: '3px',
    background: '#6A0998'
  }
}