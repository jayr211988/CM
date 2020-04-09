import PropTypes from "prop-types";
import styled from "styled-components";

const ContentWrapper = styled.div`
  border: 1px solid #E3E3E3;
  margin: ${ ({nomargin}) => nomargin ? "0px" : "15px 24px"};
  padding: ${ ({nopadding}) => nopadding ? "0px" : "0px 30px" };
  background: #FFFFFF;
  border-radius: 2px;
`;

ContentWrapper.prototype = {
  nomargin: PropTypes.bool,
  nopadding: PropTypes.bool
}

ContentWrapper.defaultProps = {
  nomargin: false,
  nopadding: false,
};

export default ContentWrapper;
