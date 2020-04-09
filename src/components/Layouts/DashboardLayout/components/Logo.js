import React from "react";

export default function Logo() {
  return(
    <img
      src={ require("fe-common/assets/img/logo2.JPG") }
      style={{
        height: 'auto',
        width: 150,
      }} alt="" />
  )
}