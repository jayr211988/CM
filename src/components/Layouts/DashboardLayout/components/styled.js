import styled from "styled-components";

export const HeaderButton = styled.a`
  /* This renders the buttons above... Edit me! */
  padding: 0 10px;
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
  -webkit-transition: all 0.3s, padding 0s;
  transition: all 0.3s, padding 0s;
  min-width: 150px;
  color: #888DA8;
  &:hover {
    background-color: #d5c3d9;
    color: #fff;
  }
`;

export const ContentHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  height: 90px;
  padding: 0 40px;

  .action-buttons {
    text-align: right;

    button {
      background: #6438bf;
      border: none;
      border-radius: 100px;
      padding: 12px 20px;
      font-weight: 600;
      color: #fff;
      letter-spacing: 2px;
      height: auto;
      margin-left: 10px;
    }
  }

  div.ant-row {
    flex: 0 0 100%;
  }

  h1 {
    font-size: 24px;
    color: #2b2b2b;
    margin: 0;
  }
`;

export const Wrapper = styled.div`
  margin: 19px 16px 19px;
  overflow: initial;
  background: #fff;
  padding: 24px;
  min-height: 280px;
  border-radius: 5px;
  box-shadow: 0 3px 10px 1px rgba(0, 0, 0, 0.1);
`;


export const RightHeader = styled.div`
  float: right;
`;

export const LogoPlaceholder = styled.div`
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  margin-bottom: 10px;
`;