import React from "react";
import { Spin } from "antd";
import { Spinner } from "./styled";

function Loader() {
  return (
    <Spinner>
      <Spin tip="Please wait" size="large" />
    </Spinner>
  );
}

export default Loader;
