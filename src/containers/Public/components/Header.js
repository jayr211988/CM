import React from "react";
import { Text } from "fe-components";
import PropTypes from "prop-types";

const Header = ({ title, description }) => {
  return (
    <div className="sign-in" style={{textAlign:'center' }}>
      <Text size={35} weight="bold">{title}</Text>
    </div>
  )
}

Header.prototype = {
  title: PropTypes.string,
  description: PropTypes.string
}

Header.defaultProps = {
  title: "No Title",
  description: "No Description"
}

export default Header;