import React from "react";
import PropTypes from "prop-types";

const Text = ({ children, size, color, weight, style }) => {
  return(
    <p
      style={{
        fontSize: size,
        color,
        fontWeight: weight,
        wordBreak: "break-word",
        ...style
      }}
    >{children}</p>
  )
}

Text.prototype = {
  size: PropTypes.number,
  color: PropTypes.string,
  weight: PropTypes.any
}

Text.defaultProps = {
  size: 14,
  color: "#2D2425",
}

export default Text;
