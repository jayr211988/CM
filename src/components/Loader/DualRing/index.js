import React from "react";
import "./style.less";

export default function DualRing() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      height: "100%"
    }}>
      <div className="lds-dual-ring"></div>;
    </div>
  );
}
