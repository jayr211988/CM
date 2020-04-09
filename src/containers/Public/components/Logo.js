import React from "react";

export default function Logo() {
  return(
    <div style={{
      flex: 1,
      display: "flex",
      alignItems: "center"
      }}>
      <img
        style={{
            height: 'auto',
            width: '172px',
            paddingLeft: 20
          }}
          src={require("fe-common/assets/img/logo.JPG")} alt="Logo" />
    </div>
  )
}
