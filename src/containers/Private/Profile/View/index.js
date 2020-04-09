// LIBRARIES
import React, { Component, Fragment } from "react";
import { Col, Row, Button, Popconfirm, Icon } from "antd";
import { withRouter, Link } from "react-router-dom";

// COMPONENTS
import { Text, BreadCrumb } from "fe-components";
import { HeaderWrapper, ButtonWrapper, ContentWrapper } from "fe-components/Styled";
import { ProfileContainer, ProfileImage } from "./components/styled";
import { Divider } from "fe-components/Styled";

// HELPERS
import { fnGetProfile } from "../helpers";

class View extends Component {
  mounted = false;

  state = {};

  async componentDidMount() {
    this.mounted = true;
    const response = await fnGetProfile();
    this.mounted && this.setState(response);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const {
      id,
      created_at,
      email,
      mobile_no,
      name,
      role,
      tel_no,
    } = this.state;

    return (
      <Fragment>
        <HeaderWrapper>
          <Row>
            <Col span={24}>
              <BreadCrumb
                items={[
                  { text: "Home" },
                  { text: "My Profile" }
                ]}
              />
            </Col>

            <Col span={12}>
              <div style={{ position: "absolute", top: 15 }}>
                <Text size={24} weight="bold">My Profile</Text>
              </div>
            </Col>
            <Col span={12}>
              <ButtonWrapper>
                <Button>
                  <Link to="/profile/update">
                    Update Profile
                  </Link>
                </Button>
                <Button>
                  <Link to="/profile/change-password">
                    Change Password
                  </Link>
                </Button>
              </ButtonWrapper>
            </Col>
          </Row>
        </HeaderWrapper>
        <ContentWrapper nopadding>
          <ProfileContainer>
            <ProfileImage src={require("fe-common/assets/img/ic_circle-user@2x.png")} />
          </ProfileContainer>
          <div style={{ margin: 24, height: 350 }}>
            <Text size={40} weight="bold">{name}</Text>
            <Text size={15}>{role}</Text>
            
            <Divider type="dashed" />
            <Text size={20} weight="bold">Contact Details</Text>

            <Row style={{ marginTop: 10 }}>
              <Col span={6}>
                <Text>Email:</Text>
                <Text color="#1890FF">{email}</Text>
              </Col>
              <Col span={6}>
                <Text>Telephone:</Text>
                <Text color="#6D6E71">{tel_no}</Text>
              </Col>
              <Col span={6}>
                <Text>Mobile Number:</Text>
                <Text color="#6D6E71">{mobile_no}</Text>
              </Col>
            </Row>
            <Divider type="dashed" />
          </div>
        </ContentWrapper>
      </Fragment>
    )
  }
}

export default withRouter(View);