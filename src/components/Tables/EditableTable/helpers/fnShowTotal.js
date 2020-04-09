import React from "react";

export default function fnShowTotal(total, totalPagination, range) {
  return (
    <div style={{ flex: "row", display: "flex" }}>
      <span>Showing&nbsp;</span>
      <b>{total > 0 ? range[0] : 0} -&nbsp;</b>
      <b>{total > 0 ? range[1] : 0}&nbsp;</b>
      <p>of&nbsp;</p>
      <b>{total > 0 ? totalPagination : 0}</b>
    </div>
  )
}
