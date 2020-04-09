import styled from "styled-components";
import PropTypes from "prop-types";

const Divider = styled.div`
  border-top: 1px ${({type})=> type} #B8BBC9;
  margin-top: 20px;
  margin-bottom 12px;
`;

Divider.prototype = {
  type: PropTypes.oneOf(["dotted", "dashed", "solid"]),
}

Divider.defaultProps = {
  type: "solid"
};

export default Divider;
